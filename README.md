## Dropdown Date Picker

Date picker with drop downs for Day, Month, and Year with dynamic selection.

![Demo](https://github.com/bsgriggs/dropdowndatepicker/blob/media/demo.png)

## Features

-   The order of the dropdowns is automatically sorted based on the current user's language settings, but can also be
    manually set
-   Ability to control the format of the days (i.e. 4, 4th)
-   Ability to control how many years are selectable as an integer expression (i.e.
    parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy')) - 50)
-   Automatically changes the selectable days by the month and year
-   Ability to use each dropdown individually (i.e. only select year, only select month and year...)
-   Supports times & custom date formats (valid characters: y, Y, M, d, h, m, s, a)
-   Control the format of the dropdowns using the date format (i.e. M = 2, MM = 02, MMM = Feb, MMMM = February)

## Configuration
This section explains the effect of each widget setting.

### General
![General Settings](https://github.com/bsgriggs/dropdowndatepicker/blob/media/general_settings.png)  
**Label -** The standard Mendix label field. This will appear as a label for the group of dropdowns, not each individual
dropdown.  
**Date -** The attribute that will get updated once the user has selected ALL of the dropdowns. Deselected any dropdown
will set the value as empty. For example, if the user selects Sep 15th, 2015 then selects Year as the first value ("Year"),
it will update the Mendix attribute as empty and clear the widget.  
**Date format -** A few presets of date formats. The format controls the order of the dropdowns. They are interpreted the same way Mendix interprets [date formats](https://docs.mendix.com/refguide/parse-and-format-date-function-calls/). The widget will automatically add and remove dropdowns depending on what is needed to complete the date in that format.  
| Type | Format | Example |
| --- | --- | --- |
| Date | Dynamic based on the current user's Language | 8/15/2014 | 
| Month | MMMM yyyy | October 2014 | 
| Year | yyyy | 2014 | 
| Time | Dynamic based on the current user's Language | 2:00 PM | 
| Date and Time | Dynamic based on the current user's Language | 8/15/2014 2:00 PM | 
| Custom | You can put in any date format (valid characters: y, Y, M, d, h, m, s, a) | October 15, 2014 14:00 |  

When the date format is "custom", a dynamic text box will appear for the developer to specify the format.  
![custom date format](https://github.com/bsgriggs/dropdowndatepicker/blob/media/general_settings_custom.png)

**Show clear button? -** Whether or not to show a button displayed after the last dropdown that the user can click to
clear all the dropdowns at once.  
**Show while empty? -** When true, the clear button will always render. When false, the clear button will only render if the date has a value.  
**Clear button icon -** Override the clear button's icon with any icon or image  
**Clear button tooltip -** The text shown if the user hovers on the clear button and is read by screen readers.  

### Customization
![customization](https://github.com/bsgriggs/dropdowndatepicker/blob/media/customization.png)  
**Minimum year -** An integer expression for the lowest year value. Use **parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy')) - 100** for 100 years ago.  
**Maximum year -** An integer expression for the highest year value. Use **parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy'))** for the current year.  
**Sort years ascending -** The sorting direction of the years in the dropdown. "Yes" = 2019, 2020, 2021. "No" = 2021,
2020, 2019.  
**Include date suffix -** When yes, the date dropdown will include a suffix for how the day is pronounced (English Only) (i.e. 1st, 2nd, 3rd, 4th ...)  
**Read only display type -** Controls the display when the date isn't editable.  

### Defaults
![defaults](https://github.com/bsgriggs/dropdowndatepicker/blob/media/defaults.png)  
Each setting controls how that part of the date is set when that part is NOT included in the date format. The developer could customize the Hour set for dates that do not include a time. For example, setting Hour to 13 would set all dates in format M/d/yyyy to be 1pm.  

### Text
![text](https://github.com/bsgriggs/dropdowndatepicker/blob/media/text.png)  
**Aria-Label -** Label for screen-readers prepended to each dropdown label (e.g, "Created On" will read as 'Created On Year', 'Created On Month', 'Created On Day', etc.).  

By default, the widget will prepend the existing on-screen label in the following manner.  

"{On-Screen Label} {Aria-Label} {Dropdown Label}"

**Dropdown Labels**  
Each setting controls what text appears in each dropdown when the dropdown does NOT have a value.  

_If you would like to assist in translating these to other languages, create a [GitHub issue](https://github.com/bsgriggs/mendix-dropdown-date-picker/issues) with your language code and the value for each label._  

### Events
![events](https://github.com/bsgriggs/dropdowndatepicker/blob/media/events.png)  
**On date change -** - Mx Action executed when the Mendix date is updated. This happens when ALL the dropdowns are selected or a dropdown is set back to empty when there was a complete date selected.  
**On dropdown change -** Mx action executed when ANY dropdown is changed.  
**On enter -** Mx action executed when ANY dropdown gains focus.  
**On leave -** Mx action executed when ANY dropdown loses focus.  

If you have ideas of other events that could be useful, create a [GitHub issue](https://github.com/bsgriggs/mendix-dropdown-date-picker/issues) and explain your idea.  

### Common
![common](https://github.com/bsgriggs/dropdowndatepicker/blob/media/common.png)  
**Name -** Mx system name for this particular widget on the page.  
**Tab index -** Where this widget appears in the page tab order. Recommended to keep it at 0.  
**Visibility -** Dynamically control if the widget renders or not.  
**Editability -** Dynamically control if the user has access to edit this field outside of the Entity Access Rules.  

## Setup

1. Set "Show label" to "Yes" and type the name of the attribute the user is entering (i.e. Birth Date).
2. In the General tab, select the date attribute that you want the user to select.
3. Select which date format you want to appear. 
4. In the Customization tab, decide on the range of years you want to be selectable and set the "Minimum Year" and
   "Maximum Year" as an expression of [%CurrentDateTime%] (this way the dropdown will automatically get new values each
   year). For example, use parseInteger(formatDateTime([%CurrentDateTime%], 'yyyy')) - 100 for 100 years ago.
5. Also in the Customization tab, decide on the order you want the years to display by setting "Sort Years Ascending?".
   "Yes" = 2019, 2020, 2021. "No" = 2021, 2020, 2019.
6. Run the project and enjoy!

## Demo project

https://widgettesting105-sandbox.mxapps.io/p/dropdown-date-picker

## Issues, suggestions, and feature requests

https://github.com/bsgriggs/mendix-dropdown-datepicker/issues

## Development and contribution

Benjamin Griggs
