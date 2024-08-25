document.addEventListener('DOMContentLoaded', () => {
    const petListElement = document.getElementById('pet-list');
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    const form = document.querySelector('form');
    const submitButton = document.getElementById('enviar');

    pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.petName;
        petListElement.appendChild(option);
    });

    document.getElementById('pet-search').addEventListener('input', function () {
        const petName = this.value;
        const pet = pets.find(p => p.petName === petName);
        if (pet) {
            document.getElementById('atendimento-responsavel').value = pet.ownerName;
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('petId');

    if (petId) {
        document.title = "Edição de Atendimento";
        const pageTitle = document.querySelector('h1');
        if (pageTitle) {
            pageTitle.textContent = "Edição de Atendimento";
        }

        // Muda o texto do botão para "Atualizar Atendimento"
        if (submitButton) {
            submitButton.value = "Atualizar Atendimento";
        }

        const atendimentoExistente = atendimentos.find(a => a.petId === petId);
        if (atendimentoExistente) {
            document.getElementById('pet-search').value = atendimentoExistente.petName;
            document.getElementById('atendimento-responsavel').value = atendimentoExistente.responsavel;
            document.getElementById('atendimento-horario').value = atendimentoExistente.horario;

            atendimentoExistente.services.forEach(service => {
                const checkbox = document.querySelector(`input[name="services"][value="${service}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });

            const perfumeRadio = document.querySelector(`input[name="perfume"][value="${atendimentoExistente.perfume}"]`);
            if (perfumeRadio) {
                perfumeRadio.checked = true;
            }
        }

        const pet = pets.find(p => p.id === petId);
        if (pet) {
            document.getElementById('pet-search').value = pet.petName;
            document.getElementById('atendimento-responsavel').value = pet.ownerName;
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const petName = document.getElementById('pet-search').value;
        const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value);
        const perfume = document.querySelector('input[name="perfume"]:checked').value;
        const responsavel = document.getElementById('atendimento-responsavel').value;
        const horario = document.getElementById('atendimento-horario').value;

        const novoAtendimento = {
            petId: petId || gerarIdUnico(),
            petName,
            services,
            perfume,
            responsavel,
            horario
        };

        if (petId) {
            const index = atendimentos.findIndex(a => a.petId === petId);
            if (index !== -1) {
                atendimentos[index] = novoAtendimento;
            }
            alert('Atendimento atualizado com sucesso!');
        } else {
            atendimentos.push(novoAtendimento);
            alert('Atendimento cadastrado com sucesso!');
        }

        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        form.reset();
        serviceCheckboxes.forEach(checkbox => checkbox.checked = false);
        document.querySelector('input[name="perfume"][value="Não"]').checked = true;
    });

    function gerarIdUnico() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }
});