const fC = document.getElementById('fCandidatos');
const cApi = "http://localhost:4000/candidatos";

fC.onsubmit = validarCandidato;
buscarCandidato();
var mAcao = 'CADASTRAR';

function gravarCandidato(){
    const objCandidato = {
        num : document.getElementById('inputNum').value,
        nome : document.getElementById('inputNome').value,
        partido : document.getElementById('inputPartido').value
    }

    fetch(cApi,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(objCandidato),

    }).then((res) => {
        return res.json();
    }).then((apiRes) => {
        if (apiRes.status == true) {
            exbirMsg(apiRes.message, 'green');
        } else {
            exbirMsg(apiRes.message, 'red');
        }   
    }).catch((erro) => {
        exbirMsg(erro, 'blue');
    })
}

function excluirCandidato() {
    fetch(cApi, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome : document.getElementById('inputNome').value})
    }).then((res) => {
        return res.json();
    }).then((resAPI) => {
        if (resAPI.status == true) {
            exbirMsg(resAPI.message, 'green');
        }
        else{
            exbirMsg(resAPI.message, 'red');
        }
    }).catch((erro) => {
        exbirMsg(erro, 'blue');
    });
}

function atualizarCandidato() {
    const objetoCandidato = {
        num : document.getElementById('inputNum').value,
        partido : document.getElementById('inputPartido').value,
        nome : document.getElementById('inputNome').value
    }

    fetch(cApi, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoCandidato)
    }).then((res) => {
        return res.json();
    }).then((resAPI) => {
        if (resAPI.status == true) {
            exbirMsg(resAPI.message, 'green');
        }
        else{
            exbirMsg(resAPI.message, 'red');
        }
    }).catch((erro) => {
        exbirMsg(erro, 'blue');
    });
}

function buscarCandidato() {
    fetch(cApi,{method: 'GET'}).then((res) => {
        return res.json();
    }).then((resAPI)=>{
        if (resAPI.status == true) {
            exbirCandidatos(resAPI.message);
        }
        else{
            exbirMsg(resAPI.message, 'red');
        }
    }).catch((erro) => {
        exbirMsg(erro, 'blue'); 
    })
}

function selecionarCandidato(nome, num, partido, Acao) {

    document.getElementById('inputNum').value = num;
    document.getElementById('inputNome').value = nome;
    document.getElementById('inputPartido').value = partido;
   
    mAcao = Acao

    const botaoConfirmacao = document.getElementById('btnConfirma');
    if (mAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (mAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }
}

function validarCandidato(evento) {

    const num       = document.getElementById('inputNum').value;
    const nome      = document.getElementById('inputNome').value;
    const partido   = document.getElementById('inputPartido').value;
   
    evento.stopPropagation();
    evento.preventDefault();
    
    if(nome && num && partido) {
        gravarCandidato()
        fC.reset()
        buscarCandidato()
        return true
    }
    else {
        exbirMsg('Preencha todos os campos acima!', 'red');
        return false;
    }
}

function exbirMsg(mensagem, cor = "black") {
    const divMsg = document.getElementById("msg");
    divMsg.innerHTML = "<p style='color: " +cor +";'>" +mensagem +"</p>";
    setTimeout(() => {
        divMsg.innerHTML = "";
    }, 5000)
}

function exbirCandidatos(lista) {
    if(lista.length > 0){
        const tabCandidatos = document.getElementById('tabCandidatos');
        const tab = document.createElement('table');
        tab.classList="table table-striped table-hover";
        const tabHead = document.createElement('thead');
        tabHead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Numero</th>
                <th>Partido</th>
                <th>Acoes</th>
            </tr>
        `;
        const tabBody = document.createElement('tbody');
        for (const c of lista) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${c.nome}</td>
                <td>${c.num}</td>
                <td>${c.partido}</td>
                <td>
                    <button style="border-radius: 9px; border: 1px solid black; color: blue" onclick="selecionarCandidato('${c.nome}','${c.num}','${c.partido}','EDITAR')">Alterar</button>
                    <button style="border-radius: 9px; border: 1px solid black; color: red" onclick="selecionarCandidato('${c.nome}','${c.num}','${c.partido}','EXCLUIR')">Excluir</button>
                </td>
            `;
            tabBody.appendChild(linha);
        }
        tab.appendChild(tabHead);
        tab.appendChild(tabBody);
        tabCandidatos.innerHTML="";
        tabCandidatos.appendChild(tab);
    }
    else {
        exbirMsg('Nenhum evento encontrado');
    }
}