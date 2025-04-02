document.addEventListener("DOMContentLoaded", loadGrocery);
const API_URL = "https://crudcrud.com/api/ee7c73060f6946b2ba5a14bf5bcb2135/groceryData";
function handleSubmitForm(event){
  event.preventDefault();
  const groceryDetails={
    name:event.target.name.value,
    description:event.target.description.value,
    price:event.target.price.value,
    quantity:event.target.quantity.value,
  };
  axios.post(API_URL,groceryDetails)
  .then((response)=>{
    displayOnScreen(response.data)
})
  .catch((error)=>console.log(error));

  document.getElementById("name").value = "";
  document.getElementById("descrption").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}
function loadGrocery() {
  axios.get(API_URL)
    .then((response) => {
      response.data.forEach(displayOnScreen); 
    })
    .catch((error) => console.log("Error fetching data:", error));
}
function displayOnScreen(groceryDetails){
  const parentElem=document.getElementById('listofitems');
  const listItem = document.createElement("li");
  listItem.innerHTML = `${groceryDetails.name} - ${groceryDetails.descrption} - ${groceryDetails.price} - <span>${groceryDetails.quantity}</span>
  <button class="buy1-btn">Buy1</button> 
  <button class="buy2-btn">Buy2</button> 
  <button class="buy3-btn">Buy3</button>
  `;
  parentElem.appendChild(listItem);

  const buy1Button = listItem.querySelector(".buy1-btn");
  const buy2Button = listItem.querySelector(".buy2-btn");
  const buy3Button = listItem.querySelector(".buy3-btn");

  buy1Button.addEventListener('click', () => updateQuantity(groceryDetails, listItem, 1));
  buy2Button.addEventListener('click', () => updateQuantity(groceryDetails, listItem, 2));
  buy3Button.addEventListener('click', () => updateQuantity(groceryDetails, listItem, 3));
}
function updateQuantity(groceryDetails, listItem, amount) {
  let newQuantity = groceryDetails.quantity - amount;
  if (newQuantity <= 0) {
    deleteUserDetail(groceryDetails._id, listItem);
  } else {
    axios.put(`${API_URL}/${groceryDetails._id}`,{
      name: groceryDetails.name,
      description: groceryDetails.description,
      price: groceryDetails.price,
      quantity: newQuantity
    })
      .then(() => {
        listItem.querySelector("span").textContent = newQuantity;
        groceryDetails.quantity = newQuantity;
      })
      .catch((error) => console.log("Error updating quantity:", error));
  }
}
function deleteUserDetail(id, listItem) {
  axios.delete(`${API_URL}/${id}`)
    .then(() => {
      listItem.remove();
    })
    .catch((error) => console.log(error));
}



