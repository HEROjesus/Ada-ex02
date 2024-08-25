function editarCachorro(petId) {
    const url = `../Cadastro-Pet/cadastro-pet.html?idCachorro=${petId}`;
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {

    const petsData = JSON.parse(localStorage.getItem('pets')) || [];

    const petListSection = document.querySelector('section.row');

    petListSection.innerHTML = '';

    petsData.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('col');

        petCard.innerHTML = `
    <div class="card h-100 flex-row align-items-center p-2 info-background-color">
        <img src="${pet.dogImage}" class="img-pet rounded-circle" alt="Imagem do Pet">
        <div class="card-body d-flex flex-column">
            <h3>Nome: <span class="pet-nome">${pet.petName}</span></h3>
            <h3>Tutor(a): <span class="pet-tutor">${pet.ownerName}</span></h3>
            <h3>
                <a class="nav-link dropdown-toggle more-info" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mais informações
                </a>
                <ul class="dropdown-menu moreinfo-background-color">
                    <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Apelido: <span class="pet-apelido">${pet.petNickname}</span></a></li>
                    <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Raça: <span class="pet-raca">${pet.breed}</span></a></li>
                    <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Porte: <span class="pet-porte">${pet.petSize}</span></a></li>
                    <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Idade: <span class="pet-idade">${calculateAge(pet.birthdate)} anos</span></a></li>
                </ul>
            </h3>
        </div>
        <img src="../../assets/img/edicao-pet.png" alt="ícone de edição do Pet" class="img-edicao" onclick="editarCachorro('${pet.id}')">
    </div>
`;

        petListSection.appendChild(petCard);
    });
});

function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}