document.getElementById('addIngredient').addEventListener('click', function() {
  const ingredientList = document.getElementById('ingredientList');
  
  const div = document.createElement('div');
  div.className = 'ingredient';
  
  const ingredientName = document.createElement('input');
  ingredientName.type = 'text';
  ingredientName.placeholder = 'Nome do Ingrediente';
  ingredientName.required = true;
  
  const ingredientQtyPerKilo = document.createElement('input');
  ingredientQtyPerKilo.type = 'number';
  ingredientQtyPerKilo.placeholder = 'Qtd. por Quilo em Estoque (Kg)';
  ingredientQtyPerKilo.required = true;
  
  const ingredientPricePerKilo = document.createElement('input');
  ingredientPricePerKilo.type = 'number';
  ingredientPricePerKilo.placeholder = 'Preço por Quilo (R$)';
  ingredientPricePerKilo.required = true;
  
  const ingredientQtyUsedGrams = document.createElement('input');
  ingredientQtyUsedGrams.type = 'number';
  ingredientQtyUsedGrams.placeholder = 'Qtd. Usada na Receita (g)';
  ingredientQtyUsedGrams.required = true;

  div.appendChild(ingredientName);
  div.appendChild(ingredientQtyPerKilo);
  div.appendChild(ingredientPricePerKilo);
  div.appendChild(ingredientQtyUsedGrams);

  ingredientList.appendChild(div);
});

// Adicionar novos campos de serviço
document.getElementById('addService').addEventListener('click', function() {
  const serviceList = document.getElementById('serviceList');

  const div = document.createElement('div');
  div.className = 'service';

  const serviceName = document.createElement('input');
  serviceName.type = 'text';
  serviceName.placeholder = 'Tipo de Serviço';
  serviceName.required = true;

  const serviceQtyHours = document.createElement('input');
  serviceQtyHours.type = 'number';
  serviceQtyHours.placeholder = 'Qtd. de Horas Disponível';
  serviceQtyHours.required = true;

  const servicePricePerHour = document.createElement('input');
  servicePricePerHour.type = 'number';
  servicePricePerHour.placeholder = 'Preço por Hora (R$)';
  servicePricePerHour.required = true;

  const serviceMinutesForRecipe = document.createElement('input');
  serviceMinutesForRecipe.type = 'number';
  serviceMinutesForRecipe.placeholder = 'Qtd. de Minutos para a Receita';
  serviceMinutesForRecipe.required = true;

  div.appendChild(serviceName);
  div.appendChild(serviceQtyHours);
  div.appendChild(servicePricePerHour);
  div.appendChild(serviceMinutesForRecipe);

  serviceList.appendChild(div);
});

// Cálculo dos custos e preço de venda
document.getElementById('recipeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Cálculo do custo dos ingredientes
  const ingredients = document.querySelectorAll('.ingredient');
  let totalCostIngredients = 0;
  
  ingredients.forEach(ingredient => {
    const pricePerKilo = parseFloat(ingredient.children[2].value);
    const qtyUsedGrams = parseFloat(ingredient.children[3].value);

    // Converter preço por quilo para preço por grama
    const pricePerGram = pricePerKilo / 1000;

    // Cálculo do custo total por ingrediente (preço por grama * quantidade usada em gramas)
    totalCostIngredients += (pricePerGram * qtyUsedGrams);
    //console.log(totalCostIngredients)
  });

  // Cálculo do custo dos serviços
  const services = document.querySelectorAll('.service');
  let totalCostServices = 0;

  services.forEach(service => {
    const pricePerHour = parseFloat(service.children[2].value);
    const minutesUsed = parseFloat(service.children[3].value);

    // Converter minutos usados para horas
    const hoursUsed = minutesUsed / 60;

    // Cálculo do custo total por serviço (preço por hora * horas usadas)
    totalCostServices += (pricePerHour * hoursUsed);
    //console.log(totalCostServices)
  });

  // Custo total (ingredientes + serviços)
  const totalCost = totalCostIngredients + totalCostServices;

  // Obtendo a margem de lucro
  const profitMargin = parseFloat(document.getElementById('profitMargin').value);

  // Calculando o preço de venda com base na margem de lucro
  const sellingPrice = totalCost + (totalCost * (profitMargin / 100));
  
  // Exibindo os resultados no HTML
  document.getElementById('costValue').textContent = totalCost.toFixed(2);
  document.getElementById('priceValue').textContent = sellingPrice.toFixed(2);
})

// Seleciona o ícone do menu hamburguer e a lista de itens do menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Função para alternar o menu
hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});
