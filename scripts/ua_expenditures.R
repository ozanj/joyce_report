library(tidyverse)

# Consumer Price Index
# https://www.minneapolisfed.org/community/financial-and-economic-education/cpi-calculator-information/consumer-price-index-and-inflation-rates-1913

consumer_price_index <- data.frame(
  "year"=c('2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'),
  "cpi"=c(214.5, 218.1, 224.9, 229.6, 233.0, 236.7, 237.0, 240.0, 245.1, 250.5)
)

# Set `curr_cpi` to be CPI of current year (ie. 2018)
cpi_current <- (consumer_price_index %>% filter(year == '2018'))$cpi

# UA Expenditures

setAs("character", "myDateTime", function(from) as.POSIXct(from, format="%m/%d/%Y %H:%M:%S %p") )

filenames <- list.files(path="./data/", pattern="ua_expenditures_[0-9]{4}\\.csv")
filepaths <- file.path("./data", filenames)
readCSV <- function(file) {
  read.csv(file,
           na.strings="",
           col.names=c("date", "payee", "category", "agency", "funding_source", "transaction_number", "po_number", "check", "check_amount", "fiscal_year", "fiscal_period"),
           colClasses=c(date="myDateTime",
                        payee="character",
                        transaction_number="character",
                        po_number="character",
                        check="character",
                        fiscal_year="character",
                        fiscal_period="factor"
           )
  )
}
data <- do.call("rbind", lapply(filepaths, readCSV))

# Add `year` col from `date` col
data$year <- as.factor(strftime(data$date, format="%Y"))

# Join `cpi` col
data <- merge(data, consumer_price_index, by="year", all.x=TRUE)

# Double check total `check_amount` for each year
data %>% group_by(year, cpi) %>% summarize(total=sum(check_amount)) %>% arrange(desc(year))
# $1,006,365,161.86 for 2018
# $770,960,448.93 for 2017
# $759,738,503.32 for 2016
# $800,484,651.95 for 2015
# $808,432,226.40 for 2014
# $826,991,912.91 for 2013
# $762,848,784.85 for 2012
# $691,545,687.48 for 2011
# $563,920,053.79 for 2010
# $130,457,341.39 for 2009

# Add `check_amount_adjusted` col to account for inflation
data$check_amount_adjusted = data$check_amount * (cpi_current / data$cpi)

write.csv(data, file = './data/ua_expenditures.csv', na = 'NULL', row.names = FALSE)
save(data, file = './data/ua_expenditures.RData')
# load('./data/ua_expenditures.RData')

# Hobsons
unique(grep('hobsons', data$payee, value = TRUE, ignore.case = TRUE))
# View(data %>% filter(payee %in% c('HOBSONS', 'HOBSONS HE')))

# 'HOBSONS INC' (2010 - 2018)
data_hobsons = data %>% filter(payee == 'HOBSONS INC')
sum(data_hobsons[data_hobsons$year %in% (2010:2018), ]$check_amount_adjusted)

# ACT
unique(grep('\\bact\\b', data$payee, value = TRUE, ignore.case = TRUE))

# 'ACT INC' (2010 - 2018)
data_act = data %>% filter(payee == 'ACT INC')
sum(data_act[data_act$year %in% (2010:2018), ]$check_amount_adjusted)

# College Board
unique(grep('college\\s?board', data$payee, value = TRUE, ignore.case = TRUE))
# Unsure if 'COLLEGEBOARD SEARCH' and 'COLLEGEBOARD*SEARCH' might be referring to: https://collegeboardsearch.collegeboard.org/pastudentsrch/support/licensing/college-board-search-services/student-search-service

# 'COLLEGE BOARD' (2010 - 2018)
# data_collegeboard = data %>% filter(payee == 'COLLEGE BOARD')
data_collegeboard = data %>% filter(payee %in% c('COLLEGE BOARD', 'COLLEGEBOARD SEARCH', 'COLLEGEBOARD*SEARCH'))
sum(data_collegeboard[data_collegeboard$year %in% (2010:2018), ]$check_amount_adjusted)
