odoo.define('GenAI.chat_ai', [], function (require) {
    'use strict';

    let conversation_until_now = [];
    let choosan_category = null;
    const ai_chat_send_button = document.getElementById('ai-chat-send-button');
    const categoryButtons = document.querySelectorAll('.category-button');
    const categoryButtonsContainer = document.querySelector('#category-buttons');
    const chat_box = document.querySelector('#chat-box');
    const message_input = document.querySelector('#message-input');

    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            choosan_category = e.target.innerText;
            categoryButtonsContainer.classList.add('d-none')
        })
    })

    if(ai_chat_send_button)
    ai_chat_send_button.addEventListener('click', (e)=>{
        let input_text = message_input.value;

        if(input_text.length==0)
            return;

        message_input.value = '';
    
        let user_chat_legend = document.createElement('small');
        user_chat_legend.classList = 'text-muted';
        user_chat_legend.innerText = 'User';

        let user_input_div = document.createElement('div');
        user_input_div.classList = 'alert alert-secondary';
        user_input_div.innerText = input_text;

            
        let Ai_chat_legend = document.createElement('small');
        Ai_chat_legend.classList = 'text-muted';
        Ai_chat_legend.innerText = 'AI';

        let Ai_response_div = document.createElement('div');
        Ai_response_div.classList = 'alert alert-primary dot-animate';
        // Ai_response_div.innerText = ' ... ';

        chat_box.appendChild(user_chat_legend);
        chat_box.appendChild(user_input_div);

        chat_box.appendChild(Ai_chat_legend);
        chat_box.appendChild(Ai_response_div);

        chat_box.scrollTop = chat_box.scrollHeight;

        // get the AI response and set it to ai_response
        fetch("/chat/ai", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                params: {
                    "user_input": input_text,
                    "data_tag":choosan_category,
                    "conversation": conversation_until_now.slice(-4),
                }
            })
        })
        .then(response=>response.json())
        .then((res)=>{
            let response = JSON.parse(res['result'])
            let ai_response = response['ai_response'];
            let sources = response['sources']

            Ai_response_div.classList.remove('dot-animate')
            Ai_response_div.innerText = ai_response;

            let Ai_chat_source_legend = document.createElement('small');
            Ai_chat_source_legend.classList = 'text-muted';
            Ai_chat_source_legend.innerText = 'Sources';

            let Ai_response_source = document.createElement('div');
            Ai_response_source.classList = 'alert alert-primary';
            // Ai_response_source.innerText = 'Sources: ';

            sources.forEach(source => {
                let source_link = document.createElement('a')
                source_link.setAttribute('href', source)
                source_link.setAttribute('target', '_blank')
                source_link.innerText = source;
                Ai_response_source.appendChild(source_link);
                
                let source_link_coma = document.createElement('span')
                source_link_coma.innerText = ', ';
                Ai_response_source.appendChild(source_link_coma);
            });


            let temp = {
                'user':input_text,
                'AI':ai_response
            }
            conversation_until_now.push(temp);

            chat_box.appendChild(Ai_response_div);
            
            if(sources.length>0){
                chat_box.appendChild(Ai_chat_source_legend);
                chat_box.appendChild(Ai_response_source);
            }

            chat_box.scrollTop = chat_box.scrollHeight;
        })

    })
});