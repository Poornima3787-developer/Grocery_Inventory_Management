const Expense=require('../models/expense');

exports.addExpense=async (req,res)=>{
const {itemName,description,price,quantity}=req.body;
try {
  const newExpense=await Expense.create({
    itemName:itemName,
    description:description,
    price:price,
    quantity:quantity
  });
  res.status(201).json(newExpense);
} catch (error) {
  res.status(500).json({ message: "Error creating expense", error });
}
}

exports.getExpenses=async (req,res)=>{
  try{
    const expense=await Expense.findAll();
    res.status(200).json(expense);
  }catch(error){
    res.status(500).json({ message: "Error fetching expenses", error });
  }
}

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, description, price, quantity } = req.body;
    await Expense.update({ itemName, description, price, quantity }, { where: { id } });
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deleteExpense=async (req,res)=>{
  const {id}=req.params;
  try {
    await Expense.destroy({
      where:{id:id}
    })
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
}