---
title: 'Recruiting the Out-of-State University'
subtitle: 'Off-Campus Recruiting by Public Research Universities'
author: Ozan Jaquette
# lib_cdn: 'https://cdn.rawgit.com/ramnathv/slidifyLibraries/master/inst/libraries'
mode: selfcontained
ext_widgets : {rCharts: [libraries/leaflet]}
framework: revealjs
revealjs:
  theme: custom
  transition: slide
  center: 'false'
bibliography: ./assets/other/spencer-bib.bib
csl: ./assets/other/apa.csl

--- #title



# Recruiting the Out-of-State University
## Off-Campus Recruiting by Public Research Universities

<img id='ua_map' src='assets/images/map_ua.png' alt='University of Alabama' />

<p class='author'>Crystal Han<span class='affiliation'>, UCLA</span></p>

<p class='author'>Ozan Jaquette<span class='affiliation'>, UCLA</span></p>

<p class='author'>Karina Salazar<span class='affiliation'>, University of Arizona</span></p>

<p id='joyce_text'>Prepared for:</p>
<img id='joyce_logo' src='assets/images/joyce_logo.png' alt='The Joyce Foundation' />

<a id='link_report' href='https://emraresearch.org/sites/default/files/2019-03/joyce_report.pdf' target='_blank'>Joyce Foundation Report</a>

--- 

# Level 1 Heading
## Level 2 Heading

This is some text. And a citation. The White House (2014)

- This is a list
    - A sublist
        - A sub-sublist

--- &vertical

# Within-case results
## Click on a university see within-case results

<p class='normal'><span style='font-weight:700'>N</span> refers to total number of off-campus recruiting visits</p>

<!--
select mu.univ_id, muc.univ_name, muc.univ_abbrev, mu.state_code, sd.state_name, muc.metro1, msa1.cbsa_title as metro1_name, muc.metro2, msa2.cbsa_title as metro2_name, muc.metro3, msa3.cbsa_title as metro3_name, (
  select count(*)
  from parsing p
  left join parsing_visiting_univs pvu on pvu.pid = p.pid
  left join univ_canon uc on uc.univ_id = pvu.univ_id and uc.pid = pvu.pid
  left join location_matches lm on lm.pid = p.pid and lm.id_type = 'ncessch'
  left join location_matches lm2 on lm2.pid = p.pid and lm2.id_type = 'ipeds'
  left join meta_high_school_public mpub on mpub.ncessch = lm.location_id
  left join meta_high_school_private mpri on mpri.ncessch = lm.location_id
  left join meta_university imu on imu.univ_id = lm2.location_id
  where pvu.univ_id = if(mu.univ_id not in ('196097', '186380', '201885', '139959', '110653', '166629', '126614', '155317'), mu.univ_id, concat(mu.univ_id, '_req'))
  and event_country = 'US'
  and event_date between '2017-01-01' and '2017-12-31'
  and uc.univ_canonical_pid is null
  and p.include = 1
  and (mpub.ncessch is null or mpub.include_school = 1)
  and (mpri.ncessch is null or mpri.include_school = 1)
  and (lm.location_id is null or lm.location_id != 'indy')
  and (imu.univ_id is null or imu.univ_id != mu.univ_id)
  and coalesce(p.`event_state`, mpub.`state_code`, mpri.`state_code`, imu.`state_code`) is not null
) as count
from meta_university mu
left join state_data sd on sd.state_code = mu.state_code
left join meta_univ_classification muc on muc.univ_id = mu.univ_id
left join msa_metadata msa1 on msa1.cbsa_code = muc.metro1
left join msa_metadata msa2 on msa2.cbsa_code = muc.metro2
left join msa_metadata msa3 on msa3.cbsa_code = muc.metro3
where mu.univ_id in ('100751', '106397', '110635', '110653', '126614', '139959', '155317', '166629', '181464', '186380', '196097', '199193', '201885', '215293', '218663')
order by 2;
-->

<ul id="univ_options">
<li><a data-univ-id="199193" data-univ-name="North Carolina State University" data-state-name="North Carolina" data-metro1-name="Raleigh, NC" data-metro2-name="New York-Newark-Jersey City, NY-NJ-PA" data-metro3-name="Washington-Arlington-Alexandria, DC-VA-MD-WV">North Carolina State University</a> (N=371)</li><li><a data-univ-id="186380" data-univ-name="Rutgers University-New Brunswick" data-state-name="New Jersey" data-metro1-name="New York-Newark-Jersey City, NY-NJ-PA" data-metro2-name="Washington-Arlington-Alexandria, DC-VA-MD-WV" data-metro3-name="San Francisco-Oakland-Hayward, CA">Rutgers University-New Brunswick</a> (N=1,629)</li><li><a data-univ-id="196097" data-univ-name="Stony Brook University" data-state-name="New York" data-metro1-name="New York-Newark-Jersey City, NY-NJ-PA" data-metro2-name="Hartford-West Hartford-East Hartford, CT" data-metro3-name="Philadelphia-Camden-Wilmington, PA-NJ-DE-MD">Stony Brook University</a> (N=1,101)</li><li><a data-univ-id="100751" data-univ-name="University of Alabama" data-state-name="Alabama" data-metro1-name="Birmingham-Hoover, AL" data-metro2-name="Atlanta-Sandy Springs-Roswell, GA" data-metro3-name="Dallas-Fort Worth-Arlington, TX">University of Alabama</a> (N=4,349)</li><li><a data-univ-id="106397" data-univ-name="University of Arkansas" data-state-name="Arkansas" data-metro1-name="Fayetteville-Springdale-Rogers, AR-MO" data-metro2-name="Dallas-Fort Worth-Arlington, TX" data-metro3-name="Chicago-Naperville-Elgin, IL-IN-WI">University of Arkansas</a> (N=1,013)</li><li><a data-univ-id="110635" data-univ-name="University of California-Berkeley" data-state-name="California" data-metro1-name="San Francisco-Oakland-Hayward, CA" data-metro2-name="Washington-Arlington-Alexandria, DC-VA-MD-WV" data-metro3-name="Atlanta-Sandy Springs-Roswell, GA">University of California-Berkeley</a> (N=906)</li><li><a data-univ-id="110653" data-univ-name="University of California-Irvine" data-state-name="California" data-metro1-name="Los Angeles-Long Beach-Anaheim, CA" data-metro2-name="Seattle-Tacoma-Bellevue, WA" data-metro3-name="Urban Honolulu, HI">University of California-Irvine</a> (N=939)</li><li><a data-univ-id="201885" data-univ-name="University of Cincinnati" data-state-name="Ohio" data-metro1-name="Cincinnati, OH-KY-IN" data-metro2-name="Chicago-Naperville-Elgin, IL-IN-WI" data-metro3-name="Washington-Arlington-Alexandria, DC-VA-MD-WV">University of Cincinnati</a> (N=1,369)</li><li><a data-univ-id="126614" data-univ-name="University of Colorado-Boulder" data-state-name="Colorado" data-metro1-name="Denver-Aurora-Lakewood, CO" data-metro2-name="Los Angeles-Long Beach-Anaheim, CA" data-metro3-name="Chicago-Naperville-Elgin, IL-IN-WI">University of Colorado-Boulder</a> (N=1,568)</li><li><a data-univ-id="139959" data-univ-name="University of Georgia" data-state-name="Georgia" data-metro1-name="Atlanta-Sandy Springs-Roswell, GA" data-metro2-name="Los Angeles-Long Beach-Anaheim, CA" data-metro3-name="Dallas-Fort Worth-Arlington, TX">University of Georgia</a> (N=885)</li><li><a data-univ-id="155317" data-univ-name="University of Kansas" data-state-name="Kansas" data-metro1-name="Kansas City, MO-KS" data-metro2-name="Chicago-Naperville-Elgin, IL-IN-WI" data-metro3-name="St. Louis, MO-IL">University of Kansas</a> (N=1,419)</li><li><a data-univ-id="166629" data-univ-name="University of Massachusetts-Amherst" data-state-name="Massachusetts" data-metro1-name="Boston-Cambridge-Newton, MA-NH" data-metro2-name="New York-Newark-Jersey City, NY-NJ-PA" data-metro3-name="Los Angeles-Long Beach-Anaheim, CA">University of Massachusetts-Amherst</a> (N=1,137)</li><li><a data-univ-id="181464" data-univ-name="University of Nebraska-Lincoln" data-state-name="Nebraska" data-metro1-name="Lincoln, NE" data-metro2-name="Chicago-Naperville-Elgin, IL-IN-WI" data-metro3-name="Dallas-Fort Worth-Arlington, TX">University of Nebraska-Lincoln</a> (N=1,421)</li><li><a data-univ-id="215293" data-univ-name="University of Pittsburgh" data-state-name="Pennsylvania" data-metro1-name="Pittsburgh, PA" data-metro2-name="Chicago-Naperville-Elgin, IL-IN-WI" data-metro3-name="Washington-Arlington-Alexandria, DC-VA-MD-WV">University of Pittsburgh</a> (N=1,233)</li><li><a data-univ-id="218663" data-univ-name="University of South Carolina-Columbia" data-state-name="South Carolina" data-metro1-name="Columbia, SC" data-metro2-name="New York-Newark-Jersey City, NY-NJ-PA" data-metro3-name="Chicago-Naperville-Elgin, IL-IN-WI">University of South Carolina-Columbia</a> (N=1,495)</li>
</ul>

*** #toc

# Table of Contents
## &nbsp;

<div class="graphs-set">
  <ul>
    <li><a href="#/2/2">National Overview</a></li>
    <li>In-State Results
      <ul>
        <li><a href="#/2/3">State (Map)</a></li>
        <li><a href="#/2/4">State (Figures)</a></li>
        <li><a href="#/2/5">Metro (Map)</a></li>
        <li><a href="#/2/6">Metro (Figures)</a></li>
      </ul>
    </li>
    <li>Out-of-State Results
      <ul>
        <li><a href="#/2/7">Top Visited Metro Areas</a></li>
        <li><a href="#/2/8">Out-of-State (Figures)</a></li>
        <li><a href="#/2/9">Metro 1 (Map)</a></li>
        <li><a href="#/2/10">Metro 1 (Figures)</a></li>
        <li><a href="#/2/11">Metro 2 (Map)</a></li>
        <li><a href="#/2/12">Metro 2 (Figures)</a></li>
      </ul>
    </li>
  </ul>
</div>

***

# National Overview
## &nbsp;

<div class="graphs-set">
  <div class="graphs-row">
    <img id="graph-overview-1" data-title="Map of visits" />
    <img id="graph-overview-2" data-title="Number of events by event type" />
  </div>
  <div class="graphs-row">
    <img id="graph-overview-3" data-title="Timeline of visits" />
    <img id="graph-overview-4" data-title="Number of events by urban or rural area" />
  </div>
</div>

***

# In-State Results
## State Map

<iframe id="map-state-in" width=100% height=100% allowtransparency="true"></iframe>

***

# In-State Results
## State Figures

<div id="graph-instate" class="graphs-set graphs-set-wide">
  <div class="graphs-row">
    <img id="graph-instate-1" data-title="Distribution of average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
    <img id="graph-instate-2" data-title="Distribution of 12th grade enrollment size of visited public HS's vs non-visited public HS's" />
    <img id="graph-instate-3" data-title="Math score proficiency by average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
  </div>
  <div class="graphs-row">
    <img id="graph-instate-4" data-title="Distribution of percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
    <img id="graph-instate-5" data-title="Distribution of number of students scoring proficient in Math in visited public HS's vs non-visited public HS's" />
    <img id="graph-instate-6" data-title="Math score proficiency by percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
  </div>
</div>

***

# In-State Results
## Metro Area Map

<iframe id="map-metro-in" width=100% height=100% allowtransparency="true"></iframe>

***

# In-State Results
## Metro Area Figures

<div id="graph-metro1" class="graphs-set graphs-set-wide">
  <div class="graphs-row">
    <img id="graph-metro1-1" data-title="Distribution of average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
    <img id="graph-metro1-2" data-title="Distribution of 12th grade enrollment size of visited public HS's vs non-visited public HS's" />
    <img id="graph-metro1-3" data-title="Math score proficiency by average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
  </div>
  <div class="graphs-row">
    <img id="graph-metro1-4" data-title="Distribution of percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
    <img id="graph-metro1-5" data-title="Distribution of number of students scoring proficient in Math in visited public HS's vs non-visited public HS's" />
    <img id="graph-metro1-6" data-title="Math score proficiency by percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
  </div>
</div>

***

# Out-of-State Results
## Top Visited Metro Areas

<div class="table-wrapper">
  <table id="table-metro-count"></table>
</div>

***

# Out-of-State Results
## &nbsp;

<div class="graphs-set">
  <div class="graphs-row">
    <img id="graph-outofstate-1" data-title="Average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used; Out-of-state only includes states where the university visited at least one high school" />
    <img id="graph-outofstate-2" data-title="Average racial composition of university vs state vs visited public HS's vs non-visited public HS's" data-caption="Out-of-state only includes states where the university visited at least one high school" />
  </div>
  <div class="graphs-row">
    <img id="graph-outofstate-3" data-title="Distribution of 12th grade enrollment size in visited public HS's vs visited private HS's" data-caption="Out-of-state only includes states where the university visited at least one high school" />
    <img id="graph-outofstate-4" data-title="Average racial composition of university vs state vs visited private HS's vs non-visited private HS's" data-caption="Out-of-state only includes states where the university visited at least one high school" />
  </div>
</div>

***

# Out-of-State Results
## Metro Area Map

<iframe id="map-metro-out-1" width=100% height=100% allowtransparency="true"></iframe>

***

# Out-of-State Results
## Metro Area Figures

<div id="graph-metro2" class="graphs-set graphs-set-wide">
  <div class="graphs-row">
    <img id="graph-metro2-1" data-title="Distribution of average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
    <img id="graph-metro2-2" data-title="Distribution of 12th grade enrollment size of visited public HS's vs non-visited public HS's" />
    <img id="graph-metro2-3" data-title="Math score proficiency by average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
  </div>
  <div class="graphs-row">
    <img id="graph-metro2-4" data-title="Distribution of percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
    <img id="graph-metro2-5" data-title="Distribution of number of students scoring proficient in Math in visited public HS's vs non-visited public HS's" />
    <img id="graph-metro2-6" data-title="Math score proficiency by percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
  </div>
</div>

***

# Out-of-State Results
## Metro Area Map

<iframe id="map-metro-out-2" width=100% height=100% allowtransparency="true"></iframe>

***

# Out-of-State Results
## Metro Area Figures

<div id="graph-metro3" class="graphs-set graphs-set-wide">
  <div class="graphs-row">
    <img id="graph-metro3-1" data-title="Distribution of average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
    <img id="graph-metro3-2" data-title="Distribution of 12th grade enrollment size of visited public HS's vs non-visited public HS's" />
    <img id="graph-metro3-3" data-title="Math score proficiency by average median household income in zip codes of visited public HS's vs non-visited public HS's" data-caption="Average median household income of age group 25-64 years olds were used" />
  </div>
  <div class="graphs-row">
    <img id="graph-metro3-4" data-title="Distribution of percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
    <img id="graph-metro3-5" data-title="Distribution of number of students scoring proficient in Math in visited public HS's vs non-visited public HS's" />
    <img id="graph-metro3-6" data-title="Math score proficiency by percent non-white students enrolled in visited public HS's vs non-visited public HS's" data-caption="Non-white is defined as students identifying as Black, Latinx, or Native" />
  </div>
</div>

--- #references

# References
## &nbsp;

<p><a id='bib-RN4017'></a><a href="#cite-RN4017">[1]</a><cite>
The White House.
<em>Commitments to action on college opportunity</em>.
Tech. rep.
The Executive Office of the President, 2014.</cite></p>
