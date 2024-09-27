// Menu Responsivo (Hamburguer)
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

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
    menu.classList.remove('active');  // Fecha o menu em dispositivos móveis
  });
});

// Mostra a seção inicial (Home)
showSection('home');

/* ================= Implementação da Troca de Tema ================= */

// Função para alternar o tema
function toggleTheme(theme) {
  const body = document.body;
  
  // Aplica ou remove a classe 'dark-theme' com base no tema selecionado
  if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }

  // Salva o tema escolhido no localStorage
  localStorage.setItem('selectedTheme', theme);
}

// Recupera o tema salvo no localStorage ao carregar a página
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'light';  // Padrão: claro
  const themeSelector = document.getElementById('theme');

  if (themeSelector) {
    themeSelector.value = savedTheme;  // Define o valor do seletor
    toggleTheme(savedTheme);  // Aplica o tema salvo

    // Evento para trocar o tema quando o usuário selecionar uma opção
    themeSelector.addEventListener('change', function() {
      const selectedTheme = this.value;
      toggleTheme(selectedTheme);
    });
  }
});

/* ==================== Restante do Código JavaScript ==================== */

// Adicionar novos campos de ingrediente
const addIngredientButton = document.getElementById('addIngredient');
if (addIngredientButton) {
  addIngredientButton.addEventListener('click', function() {
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
}

// Adicionar novos campos de serviço
const addServiceButton = document.getElementById('addService');
if (addServiceButton) {
  addServiceButton.addEventListener('click', function() {
    const serviceList = document.getElementById('serviceList');
    const div = document.createElement('div');
    div.className = 'service';
    
    const serviceName = document.createElement('input');
    serviceName.type = 'text';
    serviceName.placeholder = 'Tipo de Serviço';
    serviceName.required = true;

    /*const serviceHours = document.createElement('input');
    serviceHours.type = 'number';
    serviceHours.placeholder = 'Qtd. de Horas Disponível';
    serviceHours.required = true;*/

    const servicePricePerHour = document.createElement('input');
    servicePricePerHour.type = 'number';
    servicePricePerHour.placeholder = 'Preço por Hora (R$)';
    servicePricePerHour.required = true;

    const serviceMinutesUsed = document.createElement('input');
    serviceMinutesUsed.type = 'number';
    serviceMinutesUsed.placeholder = 'Qtd. de Minutos para a Receita';
    serviceMinutesUsed.required = true;

    div.appendChild(serviceName);
    //div.appendChild(serviceHours);
    div.appendChild(servicePricePerHour);
    div.appendChild(serviceMinutesUsed);

    serviceList.appendChild(div);
  });
}

// Cálculo dos custos e preço de venda
const recipeForm = document.getElementById('recipeForm');
if (recipeForm) {
  recipeForm.addEventListener('submit', function(event) {
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
    });

    // Cálculo do custo dos serviços
    const services = document.querySelectorAll('.service');
    let totalCostServices = 0;

    services.forEach(service => {
      const pricePerHour = parseFloat(service.children[1].value);
      const minutesUsed = parseFloat(service.children[2].value);

      // Converter minutos usados para horas
      const hoursUsed = minutesUsed / 60;

      // Cálculo do custo total por serviço (preço por hora * horas usadas)
      totalCostServices += (pricePerHour * hoursUsed);
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
  });
}

/* ==================== Conta de Usuário e Configurações ==================== */

// Conta de Usuário: Atualizar avatar do usuário
const avatarUpload = document.getElementById('avatarUpload');
const userAvatar = document.getElementById('userAvatar');

if (avatarUpload) {
  avatarUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        userAvatar.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// Conta de Usuário: Salvar as alterações
const userForm = document.getElementById('userForm');
if (userForm) {
  userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    // Exemplo de lógica de atualização (adicionar lógica real no backend)
    console.log('Salvando alterações do usuário:', {
      name,
      email,
      password,
      newPassword
    });
    alert('Dados da conta atualizados com sucesso!');
  });
}

// Configurações: Salvar as configurações
const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
  settingsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const language = document.getElementById('language').value;
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;
    const theme = document.getElementById('theme').value;

    // Aplicar o tema selecionado
    toggleTheme(theme);

    // Exemplo de lógica de atualização (adicionar lógica real no backend)
    console.log('Salvando configurações:', {
      language,
      emailNotifications,
      smsNotifications,
      theme
    });
    alert('Configurações salvas com sucesso!');
  });
}

