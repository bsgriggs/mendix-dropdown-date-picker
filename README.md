## DropdownDatePicker
Datepicker with a dropdowns for Day, Month, and Year with dynamic selection.  
*Note: This was built on Mendix version 9.6.2, but should work (in theory) on any Mendix 9 version*  
![Demo](https://github.com/bsgriggs/dropdowndatepicker/blob/media/month_full.png) 

## Features
- Ability to control the order of the dropdowns (i.e. month, day, year or day, month, year ...)
- Ability to control the format of the months (i.e. 2, Feb, or February)
- Ability to control the format of the days (i.e. 4, 4th)
- Ability to control how many years are selectable as an integer expression (i.e. parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy')) - 50)
- Automatically changes the selectable days by the month and year
- Ability to use each dropdown individually (i.e. only select year, only select month and year...)

## Configuration
This section explains the effect of each setting for the widget.
  
### General
![General Settings](https://github.com/bsgriggs/dropdowndatepicker/blob/media/general_settings.png)  
**Date -** The attribute that will get updated once the user has select ALL of the dropdowns. Deselected any dropdown will set the value as empty. For example, the user selects Sep 15th, 2015 then selects Year as the first value ("Year"), it will update the Mendix attribute as empty and clear the widget.  
**On change -** The action executed once the user has selected ALL the dropdowns.  
**Label -** The standard Mendix label field. This will appear as a label for the group of dropdowns, not each indiviudal dropdown. (See the "Date" label in the first screenshot).  
**Visible -** The standard Mendix visibility field.  
**Editable -** The standard Mendix editability field.  
  
### Month Settings
![Month Settings](https://github.com/bsgriggs/dropdowndatepicker/blob/media/month_settings.png)  
**Use Month? -** Whether or not to show the month dropdown. If set to "No", the widget will generate the date using the month in the "Default Month" setting.  
**Month Placeholder -** The default value in the month dropdown.  
**Month Display? -** The format of the months that are shown in the dropdown. For example, if the date is in September, the widget will dispay 9, Sep, or September.  
**Month Sort -** The order of the month dropdown relative to the other dropdowns (sorting ascending).  
**Default Month -** If "Use Month?" is set to "No", the widget will generate the date using this value. For example, "Use Month?" is set to "No" and "Default Month" is set to 2. When the user picks a date, it will be set in March. (0 = Jan, 1 = Feb ... 11 = Dec).  
| Number | Abbreviation | Full Text |
| :---   | :---         | :---      |
|![Number](https://github.com/bsgriggs/dropdowndatepicker/blob/media/month_number.png)|![Abbreviation](https://github.com/bsgriggs/dropdowndatepicker/blob/media/month_abbr.png)|![Full Text](https://github.com/bsgriggs/dropdowndatepicker/blob/media/month_full.png)  |  
  
### Day Settings
![Day Settings](https://github.com/bsgriggs/dropdowndatepicker/blob/media/day_settings.png)  
**Use Day? -** Whether or not to show the day dropdown. If set to "No", the widget will generate the date using the day in the "Default Day" setting.  
**Day Placeholder -** The default value in the day dropdown.  
**Day Display -** The format of the days that are shown in the dropdown. For example, if the date is 3, the widget will dispay either 3 or 3rd.  
**Day Sort -** The order of the day dropdown relative to the other dropdowns (sorting ascending).  
**Default Day -** If "Use Day?" is set to "No", the widget will generate the date using this value. For example, "Use Day?" is set to "No" and "Default Day" is set to 10. When the user picks a date, it will be set as the 10th of that month.  
| Number | With Suffix |
| :---   | :---        |
| ![Number](https://github.com/bsgriggs/dropdowndatepicker/blob/media/day_num.png) | ![With Suffix](https://github.com/bsgriggs/dropdowndatepicker/blob/media/day_suffix.png) |  
  
### Year Settings
![Year Settings](https://github.com/bsgriggs/dropdowndatepicker/blob/media/year_settings.png)  
**Use Year? -** Whether or not to show the year dropdown. If set to "No", the widget will generate the date using the year in the "Default Year" setting.  
**Year Placeholder -** The default value in the year dropdown.  
**Minimum Year -** An integer expression for the lowest year value. Use **parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy')) - 100** for 100 years ago.  
**Maximum Year -** An integer expression for the highest year value. Use **parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy'))** for the current year.  
**Year Sort -** The order of the year dropdown relative to the other dropdowns (sorting ascending).  
**Default Year -** If "Use Year?" is set to "No", the widget will generate the date using this value. For example, "Use Year?" is set to "No" and "Default Year" is set to -3. When the user picks a date, it will set the date as 3 years back from the current date (i.e. 2022 -> 2019).  

## Setup

## Demo project
https://dropdowndatepicker-sandbox.mxapps.io/

## Issues, suggestions and feature requests
https://github.com/bsgriggs/DropdownDatePicker/issues

## Development and contribution
Benjamin Griggs
