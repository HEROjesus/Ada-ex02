document.addEventListener('DOMContentLoaded', () => {
    const petListElement = document.getElementById('pet-list');

    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');

    const pets = JSON.parse(localStorage.getItem('pets')) || [];

    pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.petName;
        petListElement.appendChild(option);
    });

    const form = document.querySelector('form');

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

        const pet = pets.find(p => p.id === petId);

        if (pet) {
            document.getElementById('pet-search').value = pet.petName;
            document.getElementById('atendimento-responsavel').value = pet.ownerName;

            pet.services.forEach(service => {
                const checkbox = document.querySelector(`input[name="services"][value="${service}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });

            const perfumeRadio = document.querySelector(`input[name="perfume"][value="${pet.perfume}"]`);
            if (perfumeRadio) {
                perfumeRadio.checked = true;
            }
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const petName = document.getElementById('pet-search').value;
        const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value);
        const perfume = document.querySelector('input[name="perfume"]:checked').value;
        const responsavel = document.getElementById('atendimento-responsavel').value;
        const horario = document.getElementById('atendimento-horario').value;

        const atendimento = {
            petName,
            services,
            perfume,
            responsavel,
            horario
        };

        const atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];

        atendimentos.push(atendimento);

        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

        alert('Atendimento cadastrado com sucesso!');

        form.reset();

        serviceCheckboxes.forEach(checkbox => checkbox.checked = false);
        document.querySelector('input[name="perfume"][value="Não"]').checked = true;
    });
});