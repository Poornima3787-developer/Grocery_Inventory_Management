document.addEventListener("DOMContentLoaded", loadGrocery);
const API_URL = "http://localhost:5000/expense";
async function handleSubmitForm(event){
  event.preventDefault();
  const groceryDetails={
    itemName:event.target.name.value,
    description:event.target.description.value,
    price:event.target.price.value,
    quantity:event.target.quantity.value,
  };
  try {
    const response=await axios.post(API_URL,groceryDetails);
    displayOnScreen(response.data);
    event.target.reset();
  } catch (error) {
    console.log(error)
  }
}

async function loadGrocery() {
  try {
    const response=await axios.get(API_URL);
    response.data.forEach(displayOnScreen);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function displayOnScreen(groceryDetails){
  const parentElem=document.getElementById('listofitems');
  const listItem = document.createElement("li");
  listItem.innerHTML = `${groceryDetails.itemName} - ${groceryDetails.description} - ${groceryDetails.price} - <span>${groceryDetails.quantity}</span>
  <button class="btn buy1-btn btn-outline-primary">Buy1</button> 
  <button class="btn buy2-btn btn-outline-secondary">Buy2</button> 
  <button class="btn buy3-btn btn-outline-success">Buy3</button>
  `;
  parentElem.appendChild(listItem);

  listItem.querySelector(".buy1-btn").addEventListener('click', () => updateQuantity(groceryDetails, listItem, 1));
  listItem.querySelector(".buy2-btn").addEventListener('click', () => updateQuantity(groceryDetails, listItem, 2));
  listItem.querySelector(".buy3-btn").addEventListener('click', () => updateQuantity(groceryDetails, listItem, 3));
}

async function updateQuantity(groceryDetails, listItem, amount) {
  let currentQuantity = parseInt(listItem.querySelector("span").textContent);
  let newQuantity = currentQuantity - amount;

  const buy2Button = listItem.querySelector(".buy2-btn");
  const buy3Button = listItem.querySelector(".buy3-btn");

  if (newQuantity <= 0) {
    await deleteUserDetail(groceryDetails.id, listItem);
  } else {
    try {
      await axios.put(`${API_URL}/${groceryDetails.id}`,{
      itemName: groceryDetails.itemName,
      description: groceryDetails.description,
      price: groceryDetails.price,
      quantity: newQuantity
    })
    
    listItem.querySelector("span").textContent = newQuantity;
    
    buy2Button.disabled = newQuantity < 2;
    buy3Button.disabled = newQuantity < 3;

    if(newQuantity === 1){
      buy2Button.style.display = "none";
      buy3Button.style.display = "none";
    }
    else if(newQuantity === 2){
      buy3Button.style.display = "none";
    }else{
      buy2Button.style.display = "inline-block";
      buy3Button.style.display = "inline-block";
    }
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  }
}

async function deleteUserDetail(id, listItem) {
  try {
   await axios.delete(`${API_URL}/${id}`);
   listItem.remove();
  } catch (error) {
    console.log(error)
  }
}



