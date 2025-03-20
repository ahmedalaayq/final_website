// Main JavaScript for the website

// Toggle read more/less functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing functions");
    
    // Initialize all read more buttons with proper text
    initializeReadMoreButtons();
    
    // Set active state for current page in navigation
    setActiveNavigationLink();
    
    // Add smooth scrolling to anchor links
    setupSmoothScrolling();
    
    // Initialize the AI chatbot
    initChatbot();
});

// Initialize read more functionality
function initializeReadMoreButtons() {
    console.log("Initializing Read More buttons");
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    console.log(`Found ${readMoreButtons.length} read more buttons`);
    
    readMoreButtons.forEach((button, index) => {
        console.log(`Setting up button #${index + 1}`);
        
        // Add click event listener
        button.addEventListener('click', function() {
            // Get parent article content
            const articleContent = this.previousElementSibling;
            console.log(`Clicked button #${index + 1}, article content found: ${!!articleContent}`);
            
            if (articleContent) {
                // Toggle expanded class
                articleContent.classList.toggle('expanded');
                console.log(`Article content expanded: ${articleContent.classList.contains('expanded')}`);
            }
        });
        
        // Set initial text (accessibility)
        button.setAttribute('aria-label', 'اقرأ المزيد');
    });
}

// Set active navigation link based on current page
function setActiveNavigationLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize AI chatbot
function initChatbot() {
    // Create chatbot elements
    const chatbotContainer = document.createElement('div');
    chatbotContainer.classList.add('chatbot-container');
    
    // Create chatbot toggle button
    const chatToggle = document.createElement('button');
    chatToggle.classList.add('chatbot-toggle');
    chatToggle.innerHTML = '<i class="fas fa-robot"></i>';
    chatToggle.setAttribute('title', 'محادثة المساعد الذكي');
    
    // Create chatbot interface
    const chatInterface = document.createElement('div');
    chatInterface.classList.add('chatbot-interface');
    chatInterface.innerHTML = `
        <div class="chatbot-header">
            <h3>المساعد الذكي</h3>
            <button class="chatbot-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages"></div>
        <form class="chatbot-input-form">
            <input type="text" class="chatbot-input" placeholder="أدخل سؤالك هنا...">
            <button type="submit" class="chatbot-send"><i class="fas fa-paper-plane"></i></button>
        </form>
    `;
    
    // Append elements to the DOM
    chatbotContainer.appendChild(chatToggle);
    chatbotContainer.appendChild(chatInterface);
    document.body.appendChild(chatbotContainer);
    
    // Add event listeners for chatbot functionality
    chatToggle.addEventListener('click', function() {
        chatInterface.classList.toggle('active');
        
        // Add welcome message if it's the first time opening
        const messages = chatInterface.querySelector('.chatbot-messages');
        if (messages.children.length === 0) {
            addBotMessage('مرحباً بك في مساعد أخبار التكنولوجيا الذكي! كيف يمكنني مساعدتك اليوم؟');
        }
    });
    
    const closeBtn = chatInterface.querySelector('.chatbot-close');
    closeBtn.addEventListener('click', function() {
        chatInterface.classList.remove('active');
    });
    
    const chatForm = chatInterface.querySelector('.chatbot-input-form');
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('.chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            // Add user message to chat
            addUserMessage(message);
            
            // Clear input
            input.value = '';
            
            // Generate bot response (with slight delay to feel more natural)
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addBotMessage(botResponse);
            }, 600);
        }
    });
    
    // Function to add a user message to the chat
    function addUserMessage(message) {
        const chatMessages = chatInterface.querySelector('.chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to add a bot message to the chat
    function addBotMessage(message) {
        const chatMessages = chatInterface.querySelector('.chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to generate bot responses based on user input
    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase();
        
        // Basic response logic
        if (userInput.includes('مرحبا') || userInput.includes('أهلا') || userInput.includes('السلام')) {
            return 'أهلاً بك! كيف يمكنني مساعدتك في عالم التكنولوجيا اليوم؟';
        }
        else if (userInput.includes('من أنت') || userInput.includes('ما هو اسمك')) {
            return 'أنا المساعد الذكي لموقع أخبار التكنولوجيا، تم تصميمي لمساعدتك في الإجابة عن أسئلتك المتعلقة بالتكنولوجيا.';
        }
        else if (userInput.includes('شكرا') || userInput.includes('شكراً')) {
            return 'العفو! سعيد بمساعدتك. هل لديك أي استفسار آخر؟';
        }
        else if (userInput.includes('وداعا') || userInput.includes('مع السلامة')) {
            return 'إلى اللقاء! أتمنى لك يوماً سعيداً.';
        }
        else if (userInput.includes('هاتف') || userInput.includes('موبايل') || userInput.includes('جوال')) {
            return 'يمكنك الاطلاع على أحدث أخبار الهواتف الذكية في صفحة الهواتف من موقعنا. هل تريد معلومات محددة عن هاتف معين؟';
        }
        else if (userInput.includes('كمبيوتر') || userInput.includes('حاسوب') || userInput.includes('لابتوب')) {
            return 'لدينا مجموعة متنوعة من الأخبار حول الحاسبات في صفحة الحاسبات. يمكنك الاطلاع عليها للحصول على آخر المستجدات.';
        }
        else if (userInput.includes('ذكاء اصطناعي') || userInput.includes('ai')) {
            return 'الذكاء الاصطناعي مجال متطور بسرعة كبيرة. يمكنك زيارة صفحة الذكاء الاصطناعي للاطلاع على آخر التطورات والابتكارات.';
        }
        else if (userInput.includes('برمجة') || userInput.includes('تطوير') || userInput.includes('كود')) {
            return 'إذا كنت مهتماً بالبرمجيات وتطوير البرامج، فقسم البرمجيات لدينا يحتوي على الكثير من المقالات المفيدة حول هذا الموضوع.';
        }
        else if (userInput.includes('ألعاب') || userInput.includes('قيمنق') || userInput.includes('gaming')) {
            return 'قسم الألعاب لدينا يغطي أحدث إصدارات الألعاب والتطورات في عالم ألعاب الفيديو. يمكنك العثور على معلومات عن أحدث الألعاب والأجهزة.';
        }
        else if (userInput.includes('أمن') || userInput.includes('حماية') || userInput.includes('اختراق')) {
            return 'الأمن السيبراني مهم جداً في عصرنا الحالي. قسم الأمن السيبراني يقدم معلومات قيمة حول كيفية حماية بياناتك وأحدث التهديدات.';
        }
        else if (userInput.includes('من المشرف') || userInput.includes('من طور') || userInput.includes('من صمم')) {
            return 'تم تطوير هذا الموقع تحت إشراف أ.م.د/ أسماء مسعد و د/ هدير محمد. يمكنك العثور على مزيد من المعلومات في صفحة صناع الموقع.';
        }
        else {
            return 'شكراً على سؤالك. يمكنك تصفح موقعنا للعثور على معلومات حول مختلف مجالات التكنولوجيا. هل يمكنني مساعدتك في شيء محدد؟';
        }
    }
}
