// Supabase Configuration
const SUPABASE_URL = 'https://ixhchakkryvywixkhsdo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9Sl7S0OtWNAXQaV55u7iUw_XLdwOd8c';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle Form Submission for any form with id 'lead-form'
document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.getElementById('lead-form');
    if (!leadForm) return;

    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const msgDiv = document.getElementById('form-message');
        
        btn.disabled = true;
        const originalBtnContent = btn.innerHTML;
        btn.innerHTML = 'Enviando... <i data-lucide="loader-2"></i>';
        if (window.lucide) lucide.createIcons();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service_requested: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        const { data, error } = await supabaseClient
            .from('leads')
            .insert([formData]);

        if (error) {
            console.error('Error:', error);
            msgDiv.style.display = 'block';
            msgDiv.style.backgroundColor = '#fee2e2';
            msgDiv.style.color = '#991b1b';
            msgDiv.textContent = 'Erro ao enviar. Por favor, tente novamente ou use o WhatsApp.';
            btn.disabled = false;
            btn.innerHTML = originalBtnContent;
        } else {
            msgDiv.style.display = 'block';
            msgDiv.style.backgroundColor = '#dcfce7';
            msgDiv.style.color = '#166534';
            msgDiv.textContent = 'Solicitação enviada com sucesso! Entraremos em contato em breve.';
            e.target.reset();
            btn.innerHTML = 'Enviado! <i data-lucide="check"></i>';
        }
        if (window.lucide) lucide.createIcons();
    });
});
