
//Working from Ozan's or Brad's ------------

//Working from Ozan's or Brad's ------------
capture noisily: cd "C:\Users\ozanj\Dropbox"
display _rc
if _rc==0 { // note that the rc code I have may be different than yours
	gl drop "C:\Users\ozanj\Dropbox\"
	gl a \
}

*brad
capture noisily: cd "C:\Users\cursb\Dropbox"
if _rc==0 {
	gl drop "C:\Users\cursb\Dropbox\"
	gl a \
}


cd "${drop}out-of-state${a}data"

use pub-inst-unitid-state, clear

*********DESCRIPTIVE STATS FOR UNIVERSITY OF ALABAMA

table endyear if sector==1 & cc2000==15, contents(freq mean statea mean tuition)

sort unitid endyear
format statea statecg tuition statenonopg stateopcg staterev %15.0fc
format freshinst freshoutst noutstef ninstef ndistef %9.0fc

*REVENUE
list instname unitid endyear account staterev statea statecg stateopcg statenonopg tuition  ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(12) str(40) sepby(unitid)
	
	*statecg == stateopcg + statenonopg
	capture noisily assert statecg== stateopcg + statenonopg if account=="gasb" & unitid==100751 & statecg !=. // 3 contradictions, but just rounding errors
	
	/*
	capture drop statecgv2
	gen float statecgv2=stateopcg + statenonopg
	format statecgv2 %15.0fc
	
	list instname unitid endyear account staterev statea statecg statecgv2 stateopcg statenonopg tuition  ///
		if inlist(unitid,100751)==1 & endyear>=2000 & account=="gasb" & statecg !=. & statecg != (stateopcg + statenonopg), noobs header(25) abb(12) str(40) sepby(unitid)
	capture drop statecgv2
	*/

	*staterev == statea + statecg
	capture noisily assert staterev == statea + statecg if account=="gasb" & unitid==100751 & statecg !=. // 15 contradictions, but all just due to rounding errors from not being double
	
	/*
	capture drop staterevv2
	gen float staterevv2=statea + statecg
	format staterevv2 %15.0fc
	
	list instname unitid endyear account staterev staterevv2 statea statecg stateopcg statenonopg tuition  ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(12) str(40) sepby(unitid)
	*/
	
	list instname unitid endyear account statea statecg staterev tuition  ///
		if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(12) str(40) sepby(unitid)
	
*ENROLLMENT
list instname unitid endyear migrateyr ugftptfreshtot freshinst freshoutst freshoutstpct cohortsfaef ninstef noutstef nunkef ndistef   ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(14) str(40) sepby(unitid)

	*Assert measures from fall enrollment equal total freshman enrollment
	assert ugftptfreshtot == freshinst + freshoutst if unitid==100751 & endyear>=2001 & ugftptfreshtot !=. & freshinst !=. & freshoutst !=. // TRUE
	
	*Assert measures from SFA = total enrollment from SFA
	assert cohortsfaef== ninstef+noutstef+nunkef+ndistef if unitid==100751 & endyear>=2000 // TRUE

list instname unitid endyear migrateyr ugftptfreshtot freshinst freshoutst freshoutstpct  ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(14) str(40) sepby(unitid)	
*ENROLLMENT OF PELL

capture drop fgrnt_p
gen fgrnt_p=fgrnt_n/cohortsfaef*100
format fgrnt_p %9.1fc

capture drop pgrnt_p
gen pgrnt_p=pgrnt_n/cohortsfaef*100
format pgrnt_p %9.1fc



list instname unitid endyear migrateyr ugftptfreshtot ugftfreshtot cohortsfaef  fgrnt_n fgrnt_p   ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(14) str(40) sepby(unitid)

list instname unitid endyear migrateyr ugftptfreshtot ugftfreshtot cohortsfaef  pgrnt_n pgrnt_p   ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(14) str(40) sepby(unitid)
	
	*

*ENROLLMENT OF URM
	
d ugftfreshblmf ugftfreshhimf
foreach r in bl hi {
	capture drop pugftfresh`r'mf
	clonevar pugftfresh`r'mf=ugftfresh`r'mf
	replace pugftfresh`r'mf=ugftfresh`r'mf/ugftfreshtot*100
	format pugftfresh`r'mf %9.1fc
}

*State pop of URM

/*state_pop_1824
pop4_white_nh_1824
pop4_black_nh_1824
pop4_aina_nh_1824
pop4_api_nh_1824
pop4_hispanic_1824
*/

foreach sr in white_nh black_nh aina_nh api_nh hispanic {
	capture drop p_`sr'_1824
	gen p_`sr'_1824=pop4_`sr'_1824/state_pop_1824*100
	format p_`sr'_1824 %9.1fc
}


list instname unitid endyear re_ef ugftfreshtot ugftfreshblmf pugftfreshblmf ugftfreshhimf pugftfreshhimf pop4_black_nh_1824 p_black_nh_1824 pop4_hispanic_1824 p_hispanic_1824 ///
	if inlist(unitid,100751)==1 & endyear>=2000, noobs header(25) abb(14) str(40) sepby(unitid)

*WEST ALABAMA; 101587
*u alabama birmingham: 100663
*south alabama: 102094
list instname unitid endyear cohortsfaef  fgrnt_p ugftfreshtot ugftfreshblmf pugftfreshblmf  ///
	if inlist(unitid,102094)==1 & endyear>=2000, noobs header(25) abb(14) str(40) sepby(unitid)

	

*CHECKING APPENDIX TABLES

sort unitid endyear
list instname unitid endyear account staterev statea statecg stateopcg statenonopg tuition  ///
	if inlist(unitid,196097, 186380, 215293, 201885, 181464, 139959, 218663, 100751, 199193, 110635, 110653, 126614, 155317, 106397, 166629)==1 & endyear>=2000, ///
	noobs header(25) abb(12) str(40) sepby(unitid)
	
	
tab endyear re_ef if inlist(unitid,196097, 186380, 215293, 201885, 181464, 139959, 218663, 100751, 199193, 110635, 110653, 126614, 155317, 106397, 166629)==1 & endyear>=2000


