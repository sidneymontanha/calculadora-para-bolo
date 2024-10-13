
document.addEventListener('DOMContentLoaded', function(){
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    const hero = document.querySelector('.hero')
    const patrocinio = document.querySelector('.patrocinios')

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
      if (activeSection === home) {
        activeSection.style.display = 'block';  // Mostra a seção ativa
        hero.style.display = 'block'
        patrocinio.style.display = "flex"
      }else{
        activeSection.style.display = 'block';
        hero.style.display = 'none'
        patrocinio.style.display = 'none'
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
    showSection('calculadora');

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

  const conteudo = document.querySelector('.containerCalc')

  conteudo.addEventListener('mousemove', ()=>{
    conteudo.classList.add('containerCalc-clear')
  })

  conteudo.addEventListener('mouseout', ()=>{
    conteudo.classList.remove('containerCalc-clear')
  })

  const conteudo1 = document.querySelector('.container1')

  conteudo1.addEventListener('mousemove', ()=>{
    conteudo1.classList.add('container1-clear')
  })

  conteudo1.addEventListener('mouseout', ()=>{
    conteudo1.classList.remove('container1-clear')
  })

  const conteudo2 = document.querySelector('.container2')

  conteudo2.addEventListener('mousemove', ()=>{
    conteudo2.classList.add('container2-clear')
  })

  conteudo2.addEventListener('mouseout', ()=>{
    conteudo2.classList.remove('container2-clear')
  })
  
/* ==================== Restante do Código JavaScript ==================== */

 // Função para converter unidades de medida
 function convertUnits(value, unit) {
  switch (unit) {
    case 'kg': return value / 1000; // Converter kg para gramas
   
    case 'l': return value / 1000; // Litros para mililitros
   
    case 'unit': return value; // Para "unitário", não converter
    case 'dozen': return value / 12; // Converter dúzia para unidades
    default: return value;
  }
}

// Adicionar novos campos de ingrediente
const addIngredientButton = document.getElementById('addIngredient');
  if (addIngredientButton) {
    addIngredientButton.addEventListener('click', function () {
      const ingredientList = document.getElementById('ingredientList');
      const div = document.createElement('div');
      div.className = 'ingredient';

      const ingredientName = document.createElement('input');
      ingredientName.type = 'text';
      ingredientName.placeholder = 'Ex: trigo';
      ingredientName.required = true;

      const ingredientPricePerUnit = document.createElement('input');
      ingredientPricePerUnit.type = 'number';
      ingredientPricePerUnit.step = '0.01';
      ingredientPricePerUnit.placeholder = 'Ex: 10';
      ingredientPricePerUnit.required = true;

      const ingredientQtyUsed = document.createElement('input');
      ingredientQtyUsed.type = 'number';
      ingredientQtyUsed.step = '0.01';
      ingredientQtyUsed.placeholder = 'Ex: 250';
      ingredientQtyUsed.required = true;

      const unitSelector = document.createElement('select');
      unitSelector.innerHTML = `
        <option value="kg">Kg</option>
       
        <option value="l">Litros</option>
       
        <option value="unit">Unitário</option>
        <option value="dozen">Dúzia</option>
      `;

      div.appendChild(ingredientName);
      div.appendChild(unitSelector);
      div.appendChild(ingredientPricePerUnit);
      div.appendChild(ingredientQtyUsed);
      

      ingredientList.appendChild(div);
    });
  }

// Adicionar novos campos de serviço
const addServiceButton = document.getElementById('addService');
  if (addServiceButton) {
    addServiceButton.addEventListener('click', function () {
      const serviceList = document.getElementById('serviceList');
      const div = document.createElement('div');
      div.className = 'service';

      const serviceName = document.createElement('input');
      serviceName.type = 'text';
      serviceName.placeholder = 'Ex: Padeiro/caixa/etc...';
      serviceName.required = true;

      const servicePricePerUnit = document.createElement('input');
      servicePricePerUnit.type = 'number';
      servicePricePerUnit.step =  '0.01';
      servicePricePerUnit.placeholder = 'Valor Pago';
      servicePricePerUnit.required = true;

      const serviceQtyUsed = document.createElement('input');
      serviceQtyUsed.type = 'number';
      serviceQtyUsed.step = '0.01';
      serviceQtyUsed.placeholder = 'Ex: 40';
      serviceQtyUsed.required = true;

      const unitSelector = document.createElement('select');
      unitSelector.innerHTML = `
        <option value="mes">Salário</option>
        <option value="mes">prolabore</option>
      `;

      div.appendChild(serviceName);
      div.appendChild(unitSelector);
      div.appendChild(servicePricePerUnit);
      div.appendChild(serviceQtyUsed);
     

      serviceList.appendChild(div);
    });
  }

// Cálculo dos custos e preço de venda

const recipeForm = document.getElementById('recipeForm');
  if (recipeForm) {
    recipeForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Cálculo do custo dos ingredientes
      const ingredients = document.querySelectorAll('.ingredient');
      let totalCostIngredients = 0;

      ingredients.forEach(ingredient => {
        const unit = ingredient.children[1].value;
        const pricePerUnit = parseFloat(ingredient.children[2].value);
        const qtyUsed = parseFloat(ingredient.children[3].value);

        // Converter a quantidade usada para gramas/ml/etc., se necessário
        const convertedQty = convertUnits(qtyUsed, unit);

          // Cálculo do custo total por ingrediente (preço por unidade * quantidade usada convertida)
          totalCostIngredients += pricePerUnit * convertedQty;
          //console.log(convertedQty)
          //console.log(totalCostIngredients)   
      });

      // Cálculo do custo dos serviços
      const services = document.querySelectorAll('.service');
      let totalCostServices = 0;

      services.forEach(service => {
        const unit = service.children[1].value;
        const pricePerUnit = parseFloat(service.children[2].value);
        const qtyUsed = parseFloat(service.children[3].value);
        

        let convertedQty = qtyUsed;

        if (unit === 'mes') {
          convertedQty = qtyUsed / 60; // Converter minutos para horas
          //console.log(convertedQty)
        }

        // Cálculo do custo total por serviço (preço por unidade * quantidade usada convertida)
        totalCostServices += pricePerUnit / 220 * convertedQty;

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
    });
  }
});


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


