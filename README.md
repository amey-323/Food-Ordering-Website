# Food-Ordering-Website
A website where user can buy food products from a specific hotel to which the website belongs to. <br/>
 College: K.J.Somaiya College of Engineering, Mumbai <br/>
 Class TY COMPS B
### Contributors:
- [Amey Gangan](https://github.com/amey-323)
- [Kunal Maniyar](https://github.com/KunalManiyar)
- [Jayadeep More](https://github.com/Jayadeep01)

### Simulation:
https://user-images.githubusercontent.com/62855667/180479249-1f43a09c-39ea-42f6-9ee4-ae70a208a9ce.mp4

### Installation:
1. Clone the repository.
2. Run the command ```npm i``` after going to the main main project directory to install all node modules.
3. Go to the frontend directory and run the ```npm i``` command to install all node modules required for frontend.
4. Create two terminals.On one terminal go to frontend directory and run command ```npm start``` to start the frontend and on other terminal go to backend directory and run command ```node server.js``` to run the backend of the project.

### Technologies Used:
1.	We have a MERN architecture for developing a website.
2.	MongoDB is used as a cloud database for the website.
3.	App level state management is done by making use of redux which reduces complexity of state management.
4.	Cloudinary is used for storing the images. Eg: When image is uploaded by a user as a profile picture or storing food product images etc.
5.	For authentication, we have made use of jwt tokens which expire after a certain time.
6.	We have used stripe api for payment .
7.	We have used send grid api for sending mail to the user.

### Features:
#### Registered User: 
1.	User can explore different products. He/She can apply different filters category.
2.	User can choose products between different prize range as well as he can choose different products having specific ratings.
3.	User can login for shopping.
4.	There is cart provided to each user where user can keep items which they want to buy. User can add and remove different items from cart.
5.	There is search bar which will show all the products related to search in search bar.
6.	There is email provided in contact field which will redirect to mail page.
7.	User will able to change his details (credentials) in edit profile option.
8.	All orders of each user are viewed to him on a separate page.
9.	User will able to give review on products.
10.	User can add no of products to cart and then he will put shipping info and then finally card details for payment.

#### Unregistered User: 
He will able to browse all items. But he will have to register to buy any product. After registering he will be able to access all the functionalities of registered user.

#### Admin:
1.	Admin has access to dashboard which shows users, products and orders.
2.	Admin can add, remove, update different products
3.	Admin can make another user as admin and can also add or remove user.
4. Admin can see status of all the orders in one place and can update the same. '

### References:
-	Offical documentation for node, react, npm packages, jwt, stripe api,cloudinary api.
-	Youtube
-	MDN Docs
-	StackOverflow

### UI Screens(For user):
### 1. Login:
![image](https://user-images.githubusercontent.com/62855667/147272599-0508c79a-a6ff-4074-9671-efea3fe3d47d.png)
### 2. Register:
![image](https://user-images.githubusercontent.com/62855667/147272690-0227e3f6-376d-49f6-a5aa-abbf04b2a623.png)
### 3. Food Items Page:
![image](https://user-images.githubusercontent.com/62855667/147272996-eff199bd-5a95-42cc-a801-bcd305877fd5.png)
### 4. Food Items Info Page:
![image](https://user-images.githubusercontent.com/62855667/147273073-b22bb418-f681-4024-b511-bccb11d90de5.png)
### 5. My Profile Page:
![image](https://user-images.githubusercontent.com/62855667/147273226-77825176-3d02-476b-a647-922492100b4a.png)
### 6. My Orders Page:
![image](https://user-images.githubusercontent.com/62855667/147273291-fb6a3fe8-744d-48e7-acca-f701c93e1814.png)
### 7. Order Details Page:
![image](https://user-images.githubusercontent.com/62855667/147276299-06fc68b9-52b2-4275-ad3f-ab8efb9bdc34.png)
### 8. My Cart Page:
![image](https://user-images.githubusercontent.com/62855667/147273341-1739d6e2-78ff-410d-a6aa-e9ba973d9dc0.png)

### UI Screens(For Admin):
### 1. My Profile Page:
![image](https://user-images.githubusercontent.com/62855667/147276492-91d56573-16f0-48e2-85c8-96fedc64eb60.png)
### 2. Update Profile Page:
![image](https://user-images.githubusercontent.com/62855667/147276517-ad0f33d0-8b32-4ad7-a2c6-3b23abdda4d9.png)
### 3. Update Password Page:
![image](https://user-images.githubusercontent.com/62855667/147276600-f359de95-ad3b-4d8a-872e-b21383dc0c61.png)
### 4. Dashboard Page:
![image](https://user-images.githubusercontent.com/62855667/147276727-b8df6da5-57f0-4dc8-a760-8997f8560450.png)
### 5. All Products Page:
![image](https://user-images.githubusercontent.com/62855667/147276780-95041f05-2c3c-44bb-835a-a9848e4a0d1f.png)
### 6. Create Product Page:
![image](https://user-images.githubusercontent.com/62855667/147276952-f44a8170-4b8b-4918-9f9c-f597b0e85a5b.png)
### 7. Update Product Page:
![image](https://user-images.githubusercontent.com/62855667/147276848-37793b53-4bd3-446b-b880-4307bcae8c0e.png)
### 8. All Orders Page:
![image](https://user-images.githubusercontent.com/62855667/147276995-a8bab484-75bf-41fa-af11-257d34526931.png)
### 9. Update Order(Status) Page:
![image](https://user-images.githubusercontent.com/62855667/147277062-0c6a6ca9-13b2-43f2-94dc-0af1321dff8e.png)
### 10. All Users Page:
![image](https://user-images.githubusercontent.com/62855667/147277109-646a2e0b-c326-4750-b8fd-c69dfe466da7.png)
### 11. Update User(Role) Page:
![image](https://user-images.githubusercontent.com/62855667/147277195-7e060712-19b5-4ada-bf79-2928b5821ae9.png)
### 12. All Reviews Page:
![image](https://user-images.githubusercontent.com/62855667/147277513-d6a982d6-9f16-4263-8615-4ac98bb0245f.png)





