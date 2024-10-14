const fP = document.getElementById('fPartidos');
const pApi = "http://localhost:4000/partidos";

fP.onsubmit = validarPartido;
buscarPartido();
var mAcao = 'CADASTRAR';

function gravarPartido(){
    const objPartido = {
        num : document.getElementById('inputNum').value,
        nome : document.getElementById('inputNome').value,
        sigla: document.getElementById('inputSigla').value
    }

    fetch(pApi,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(objPartido),

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

function excluirPartido() {
    fetch(pApi, {
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

function atualizarPartido() {
    const objetoPartido = {
        num : document.getElementById('inputNum').value,
        sigla : document.getElementById('inputSigla').value,
        nome : document.getElementById('inputNome').value
    }

    fetch(pApi, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
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

function buscarPartido() {
    fetch(pApi,{method: 'GET'}).then((res) => {
        return res.json();
    }).then((resAPI)=>{
        if (resAPI.status == true) {
            exbirPartidos(resAPI.message);
        }
        else{
            exbirMsg(resAPI.message, 'red');
        }
    }).catch((erro) => {
        exbirMsg(erro, 'blue'); 
    })
}

function selecionarPartido(nome, num, sigla, Acao) {

    document.getElementById('inputNum').value = num;
    document.getElementById('inputNome').value = nome;
    document.getElementById('inputSigla').value = sigla;
   
    mAcao = Acao

    const botaoConfirmacao = document.getElementById('btnConfirma');
    if (mAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (mAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }
}

function validarPartido(evento) {

    const num       = document.getElementById('inputNum').value;
    const nome      = document.getElementById('inputNome').value;
    const sigla   = document.getElementById('inputSigla').value;
   
    evento.stopPropagation();
    evento.preventDefault();
    
    if(nome && num && sigla) {
        gravarPartido()
        fP.reset()
        buscarPartido()
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

function exbirPartidos(lista) {
    if(lista.length > 0){
        const tabPartidos = document.getElementById('tabPartidos');
        const tab = document.createElement('table');
        tab.classList="table table-striped table-hover";
        const tabHead = document.createElement('thead');
        tabHead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Numero</th>
                <th>Sigla</th>
                <th>Acoes</th>
            </tr>
        `;
        const tabBody = document.createElement('tbody');
        for (const p of lista) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.num}</td>
                <td>${p.sigla}</td>
                <td>
                    <button style="border-radius: 9px; border: 1px solid black; color: blue" onclick="selecionarPartido('${p.nome}','${p.num}','${p.sigla}','EDITAR')">Alterar</button>
                    <button style="border-radius: 9px; border: 1px solid black; color: red" onclick="selecionarPartido('${p.nome}','${p.num}','${p.sigla}','EXCLUIR')">Excluir</button>
                </td>
            `;
            tabBody.appendChild(linha);
        }
        tab.appendChild(tabHead);
        tab.appendChild(tabBody);
        tabPartidos.innerHTML="";
        tabPartidos.appendChild(tab);
    }
    else {
        exbirMsg('Nenhum evento encontrado');
    }
}