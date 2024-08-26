$(document).ready(function () {
    $("#phoneNumber").mask("(00) 00000-0000");

    fetchRacas().then(() => {
        const petId = obterValorParametroURL('idCachorro');
        if (petId) {
            preencherCamposEdicao(petId);
        }
    });

    $('#breed').change(selecionarRaca);
});

async function fetchRacas() {
    const racaSelecionada = document.getElementById('breed');

    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();

        if (data.status === 'success') {
            const racas = data.message;

            for (const raca in racas) {
                const option = document.createElement('option');
                option.value = raca;
                option.text = raca;
                racaSelecionada.appendChild(option);
            }
        } else {
            console.error('Erro na busca');
        }

    } catch (error) {
        console.error('Erro ao buscar raças:', error);
    }
}

async function selecionarRaca() {
    const racaSelecionada = document.getElementById('breed').value;

    if (racaSelecionada) {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${racaSelecionada}/images/random`);
            const data = await response.json();

            if (data.status === 'success') {
                const dogImagem = data.message;
                exibirImagemDog(dogImagem);
            } else {
                console.error('Erro ao obter a imagem da raça');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

function exibirImagemDog(url) {
    const imgElement = document.getElementById('dogImagePreview');
    imgElement.src = url;
    imgElement.style.display = 'block';
}

function gerarIdUnico() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

function salvarPet(pet) {
    pet.id = gerarIdUnico();
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.push(pet);
    localStorage.setItem("pets", JSON.stringify(pets));
    alert("Cadastro salvo com sucesso!");
}

function obterValorParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

function preencherCamposEdicao(petId) {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const pet = pets.find(p => p.id === petId);

    if (pet) {
        document.getElementById('petName').value = pet.petName;
        document.getElementById('ownerName').value = pet.ownerName;
        document.getElementById('petNickname').value = pet.petNickname;
        document.getElementById('petSize').value = pet.petSize;
        document.getElementById('birthdate').value = pet.birthdate;
        document.getElementById("coatType").value = pet.coatType;
        document.getElementById("breed").value = pet.breed;
        selecionarRaca();
        document.getElementById("phoneNumber").value = pet.phoneNumber;
        document.getElementById("email").value = pet.email;
        document.getElementById("observations").value = pet.observations;
    }
}

function enviar() {
    const petName = document.getElementById("petName").value;
    const petNickname = document.getElementById("petNickname").value;
    const birthdate = document.getElementById("birthdate").value;
    const petSize = document.getElementById("petSize").value;
    const coatType = document.getElementById("coatType").value;
    const breed = document.getElementById("breed").value;
    const ownerName = document.getElementById("ownerName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const observations = document.getElementById("observations").value;
    const dogImage = document.getElementById("dogImagePreview").src;

    const idCachorro = obterValorParametroURL("idCachorro");

    const objt = {
        id: idCachorro || gerarIdUnico(),
        petName: petName,
        petNickname: petNickname,
        birthdate: birthdate,
        petSize: petSize,
        coatType: coatType,
        breed: breed,
        ownerName: ownerName,
        phoneNumber: phoneNumber,
        email: email,
        observations: observations,
        dogImage: dogImage,
    };

    if (idCachorro) {
        atualizarPet(objt);
        alert("Cadastro atualizado com sucesso!");
    } else {
        salvarPet(objt);
    }

    document.getElementById("form").reset();

    document.getElementById("dogImagePreview").src = "";
    document.getElementById("dogImagePreview").style.display = 'none';
}

function buscarPet(id) {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    return pets.find((p) => p.id === id);
}

function atualizarPet(petAtualizado) {
    let pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets = pets.map((pet) =>
        pet.id === petAtualizado.id ? petAtualizado : pet
    );
    localStorage.setItem("pets", JSON.stringify(pets));
}