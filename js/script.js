// Seleciona o ícone do menu hamburguer e a lista de itens do menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Alterna o menu responsivo quando o hambúrguer é clicado
hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Função para alternar entre as seções
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = 'none';  // Oculta todas as seções
  });

  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = 'block';  // Mostra a seção ativa
  }
}

// Adiciona o evento de clique aos links do menu para trocar de seção
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();  // Impede o comportamento padrão do link
    const section = link.getAttribute('data-section');
    showSection(section);  // Mostra a seção correspondente
  });
});

// Mostra a seção inicial (Home)
showSection('home');

// Adicionar novos campos de ingrediente
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

  const ingredientQtyUsed = document.createElement('input');
  ingredientQtyUsed.type = 'number';
  ingredientQtyUsed.placeholder = 'Qtd. Usada na Receita (g)';
  ingredientQtyUsed.required = true;

  div.appendChild(ingredientName);
  div.appendChild(ingredientQtyPerKilo);
  div.appendChild(ingredientPricePerKilo);
  div.appendChild(ingredientQtyUsed);

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

  const serviceHours = document.createElement('input');
  serviceHours.type = 'number';
  serviceHours.placeholder = 'Qtd. de Horas Disponível';
  serviceHours.required = true;

  const servicePricePerHour = document.createElement('input');
  servicePricePerHour.type = 'number';
  servicePricePerHour.placeholder = 'Preço por Hora (R$)';
  servicePricePerHour.required = true;

  const serviceMinutesUsed = document.createElement('input');
  serviceMinutesUsed.type = 'number';
  serviceMinutesUsed.placeholder = 'Qtd. de Minutos para a Receita';
  serviceMinutesUsed.required = true;

  div.appendChild(serviceName);
  div.appendChild(serviceHours);
  div.appendChild(servicePricePerHour);
  div.appendChild(serviceMinutesUsed);

  serviceList.appendChild(div);
});

