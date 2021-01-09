# webshop-webtech2020

Functional Requirements

1. MANDATORY Site architecture: The application have 2 web pages:

a. Landing page: accessible via the URL ‘/’ (http://webshop-api-webtech2020.herokuapp.com/, http://localhost:8080/). The landing page provides a disclaimer (“By proceeding to the webshop you accept the terms and conditions”) and the total number of items available for sale in the shop. The page is generated on the server via the HTML templating mechanism of Django.

b. Shop page: accessible via ‘http://webshop-webtech2020.herokuapp.com/’ contains all the other functionalities of the webshop. The page is implemented as a single-page application (SPA) using React.


2. Automatic DB population: on the landing page (for grading purposes) there is a link where any anonymous visitor will be able to automatically populate the DB with 6 users, of which 3 users (i.e. sellers) own 30 items. Before each re-population the DB will be emptied. The generated users will have the following format:

a. Username: testuser#

b. Password: pass#

c. Email address: testuser#@shop.aa

After the data is generated the landing page is updated.


3. Browse: Any user can see the list of items for sale. Sold items should only be listed on the seller’s page.
a. The item (graphical) component have this information:

i.Title

ii.Description

iii.Date added

iv.Price

b. The API will return 9 items per request. Next set of items will be fetched with pagination method.
c. The items are ordered by creation date (new-to-old).

4. Search: Any user can search for items by title. Sold items should only be listed on the seller’s page.
The API will return 9 items per request. Next set of items will be fetched with pagination method. The items are ordered by creation date (new-to-old).

5. Routing: The Shop page is implemented as an SPA. One is able to navigate from the browser (bar) to the following links:

a. Shop “/”

b. SignUp “/signup”

c. Login “/login”

d. Edit Account “/account”

e. MyItems: “/myitems”


6. Create account: Users are able to create an account by setting username, password, and email address. For making evaluation easier app does not strong password authentication and check emails against regular expressions.

7. Login: a registered user can log in, after which he/she can authenticate him-/herself to the server.

8. Edit Account: an authenticated user is able to change the password of the account by providing the old and the new password.

9. Add item: an authenticated user can add a new item to sell by providing.

a. Title

b. Description

c. Price

The date of creation is automatically saved on the backend.


10. Display inventory: an authenticated user is able to visualize his/her own items: on sale, sold, and purchased. Not paginated. 

11. Edit item: the seller of an item can edit the price of the item as long as the item is on sale (available), via the Edit button, regardless of the item being added to any other buyers’ carts.

12. Add to cart: An authenticated user can select an item for purchase by adding it to the cart. A user (buyer or seller) cannot add to cart its own items. The item should still be available for other users to search for and add to their cart.

13. Remove from cart: an item can be removed from the cart by the buyer.

14. Pay: the buyer sees the list of items to be purchased. When pressing the “PAY” button:

a. If the price of an item has changed for any item in the cart, the cart transaction is halted and

i.a notification will be shown next to the item, and

ii.the displayed price will be updated to the new price.

b. If an item is no longer available when the user clicks 'Pay', the whole cart-transaction is halted and a notification is shown to the user without removing the item from the cart. The user can remove manually the unavailable items and then Pay.

c. On a successful Pay transaction, the status of each item in the cart becomes SOLD. The bought items are listed as the buyer’s item (they are not available for sale). An email notification is sent to each seller and buyer to notify which items are sold and bought.



Non-Functional Requirements

15. Responsive: The web looks nice both on computer screen width>= 760px and phone width< 760px.

16. Security: For simplicity we use http only. Only authenticated users can buy and sell.

17. Usability: the site does reflect modern design principles.



Technical Requirements

18. MANDATORY Backend:

a. Backend uses Django,

b. Django serves JSON to the shop page and HTML to the landing page

c. Uses file backend for email (for grading purposes)

19. MANDATORY Frontend: uses React JS

20. The application is deployed on heroku.com


Implemented as two apps.

a.	Django API + main page, 
http://webshop-api-webtech2020.herokuapp.com/

b.	React Frontend, 
http://webshop-webtech2020.herokuapp.com/
