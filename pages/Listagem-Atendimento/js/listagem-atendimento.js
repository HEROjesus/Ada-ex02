document.addEventListener("DOMContentLoaded", () => {

    const atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];

    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    const section = document.querySelector("section.row");

    atendimentos.forEach((atendimento) => {
        const petEncontrado = pets.find((pet) => pet.petName === atendimento.petName);

        const observacaoPet = petEncontrado ? petEncontrado.observations : "Sem observações";
        const tutorPet = petEncontrado ? petEncontrado.ownerName : "Tutor não informado";
        const imagemPet = petEncontrado && petEncontrado.dogImage ? petEncontrado.dogImage : "https://cdn-icons-png.flaticon.com/512/194/194279.png";

        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
        <div class="card h-100 flex-row align-items-center p-2 info-background-color">
            <img src="${imagemPet}" class="img-pet rounded-circle" alt="Imagem do pet">
            <div class="card-body d-flex flex-column">
                <h3>Nome: <span class="pet-nome">${atendimento.petName}</span></h3>
                <h3>Tutor: <span class="pet-tutor">${tutorPet}</span></h3>
                <h3>Serviço: <span class="atendimento-tipo">${atendimento.services.join(", ")}</span></h3>
                <h3>Status: <span class="atendimento-status">Em andamento</span></h3>
                <h3>
                    <a class="nav-link dropdown-toggle more-info" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Mais informações
                    </a>
                    <ul class="dropdown-menu moreinfo-background-color">
                        <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Perfume: <span class="atendimento-perfume">${atendimento.perfume}</span></a></li>
                        <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Responsável: <span class="atendimento-responsavel">${atendimento.responsavel}</span></a></li>
                        <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Horário: <span class="atendimento-horario">${atendimento.horario}</span></a></li>
                        <li><a class="dropdown-item more-info-item title-color-secundary bold" href="#">Observação: <span class="atendimento-obs">${observacaoPet}</span></a></li>
                    </ul>
                </h3>
            </div>
            <img src="../../assets/img/edicao-atendimento.png" alt="ícone de edição do Pet" class="img-edicao" onclick="window.location.href='../Cadastro-Atendimento/cadastro-atendimento.html?petId=${petEncontrado.id}'">
        </div>
      `;

        section.appendChild(card);
    });
});