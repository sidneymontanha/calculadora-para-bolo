document.getElementById('addIngredient').addEventListener('click', function() {
    // Adiciona um novo campo para ingrediente
    const ingredientList = document.getElementById('ingredientList');
    
    const div = document.createElement('div');
    div.className = 'ingredient';
    
    const ingredientName = document.createElement('input');
    ingredientName.type = 'text';
    ingredientName.placeholder = 'Nome do Ingrediente';
    ingredientName.required = true;
    
    const ingredientPrice = document.createElement('input');
    ingredientPrice.type = 'number';
    ingredientPrice.placeholder = 'Preço (R$)';
    ingredientPrice.required = true;
    
    div.appendChild(ingredientName);
    div.appendChild(ingredientPrice);
    ingredientList.appendChild(div);
  });
  
  document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém a lista de ingredientes e preços
    const ingredients = document.querySelectorAll('.ingredient input[type="number"]');
    let totalCost = 0;
    
    ingredients.forEach(ingredient => {
      totalCost += parseFloat(ingredient.value) || 0;
    });
  
    // Obtém a margem de lucro
    const profitMargin = parseFloat(document.getElementById('profitMargin').value);
  
    // Calcula o preço de venda com base na margem de lucro
    const sellingPrice = totalCost + (totalCost * (profitMargin / 100));
    
    // Exibe os resultados no HTML
    document.getElementById('costValue').textContent = totalCost.toFixed(2);
    document.getElementById('priceValue').textContent = sellingPrice.toFixed(2);
  });
  