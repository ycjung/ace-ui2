[readme.txt]


***************************************************************************
update at Aug-27, 2012

1.On the Data Cart window: The checkboxes for items in the data cart were not aligned with data; the checkboxes were tiny when I first went to the window. When I refreshed the list it was OK, except the size of the checkboxes are a little bit too small, so for more than about 10 experiments, the boxes do not align.
-> fixed

2.In the search options, when the 'crop type' category is selected, the options box closes.  It should be the opposite action. If the user selects the crop type category, the options should expand, or stay expanded.  Unclick the category should contract the options (or leave them contracted).
-> fixed

3.Import and Export need to be separate, not both part of a single page.  Maybe the main functions should be Search, Map, Export, Import.  Search, data cart and export are all pieces of the same function.  Data import is separate.  Both Import and Export functions use the map.
-> seperated


***************************************************************************
update at Aug-26, 2012

Chrome browser to test UI.
 
1.Message box: 'System runs on Local mode' at startup
-> fixed

2.The same checkbox misalignment also occurs on the search page.
-> fixed

3.For the data cart, change the wording above the list to 'Your cart holds xx datasets'.  (Is this possible to show the number of items?) 
-> fixed

4.Same thing for the Search list. The text should read, 'Your search returned xx datasets'.
-> fixed

5.On the Data Cart window, move the '* Detail Data Information' label to just above the box that will hold the detailed data.  Move the 'Choose download data format' section up.
-> fixed

6.Change 'Layers' in top menu to 'Map Layers'.
-> fixed

***************************************************************************
update at Aug-22, 2012

1. fix bug: turn on check box of location category and crop category

- if there are changes in the country or crop list selection, 
mark a check on the category's check box 
when the category check box of location or crop is unchecked

***************************************************************************
update at Aug-18, 2012

1. add client-side interface for communicating with server

- country list
- crop list
- search function
- data export function - not complete yet

***************************************************************************
update at Aug-15, 2012

1. add function to zoom in the clustered features when the cluster number is cliecked.

2. fix bug: lost image icons in main page

3. user guide page is filled with some contents.

