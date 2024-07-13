import { diasSelect } from "./select.js";

const atividades = document.querySelector('section');
const form = document.querySelector('form');
const hora = document.querySelector('select[name=hora]');
const dataSelect = document.querySelector('select[name=dia]');
const textoTarefa = document.querySelector('input[type=text]');
const textoTarefaCampo = document.querySelector('.text');

let atividadesSalvasBD = [
    {
        nome: "Jogar Bolar",
        data: new Date("2023-07-09 12:00"),
        finalizada: true

    },
    {
        nome: "Academia em grupo",
        data: new Date("2021-07-09 12:00"),
        finalizada: false

    },
    {
        nome: "Gamming session",
        data: new Date("2022-07-09 12:00"),
        finalizada: true

    }];



let dataFormatada = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format("DD"),
            semana: {
                curto: dayjs(data).format("ddd"),
                longo: dayjs(data).format("dddd")
            }
        },
        mes: dayjs(data).format("MMMM"),
        hora: dayjs(data).format("HH:mm")
    };

}

let componenteAtividade = (atividade) => {

    let input;
    let novaData = dataFormatada(atividade.data)

    if (atividade.finalizada) {
        input = `<input class="checkbox-round" type='checkbox' value='${atividade.data}' checked />`;
    } else {
        input = `<input class="checkbox-round" type='checkbox' value='${atividade.data}' />`;
    }

    return (
        `<div class="card-bg">
            ${input}
            <span>${atividade.nome}</span>
            <time > 
                ${novaData.dia.semana.longo}, dia
                ${novaData.dia.numerico} de
                ${novaData.mes} às
                ${novaData.hora}h
            </time>
        </div> `
    );

}


let estadoComponenteAtividade = (atividadesSalvas) => {
    atividades.innerHTML = "";
    if (atividadesSalvas.length == 0) {
        atividades.innerHTML = "<p>Sem atividade cadastrada!<p/>";
        return
    }
    atividadesSalvas.forEach((atividade) => {
        atividades.innerHTML += componenteAtividade(atividade);
    })


    const dataChecked = document.querySelectorAll('input[type=checkbox]')

    dataChecked.forEach((atividade) => {
        atividade.addEventListener('click', (e) => {
            let data = e.target.value;
            atividadesSalvas.filter((atividadeAtualizar) => {
                if (atividadeAtualizar.data == data) {
                    atividadeAtualizar.finalizada = !atividadeAtualizar.finalizada;
                }
            })
            console.log(data)
        })

    })

}

let criarHoraSelect = () => {
    Array.from({ length: 24 }).map((_, i) => {
        let hrs = String(i).padStart(2, '0');
        hora.innerHTML += `<option value="${hrs}:00">${hrs}:00</option>`;
        hora.innerHTML += `<option value="${hrs}:30">${hrs}:30</option>`;
    })

}

let criarDataSelec = (datas) => {
    datas.forEach((data) => {
        let diaFormatado = dataFormatada(data);
        dataSelect.innerHTML += `<option value="${data}">
                                    ${diaFormatado.dia.numerico} de
                                    ${diaFormatado.mes}
                                </option>`;
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let dadosAtividade = new FormData(e.target);

    let atividadeNova = {
        nome: dadosAtividade.get("atividade"),
        data: new Date(`${dadosAtividade.get("dia")} ${dadosAtividade.get("hora")}`),
        finalizada: false
    }

    let tarefaCadastrada = atividadesSalvasBD.filter((tarefa) => tarefa.nome == atividadeNova.nome ? true : false)
    console.log(tarefaCadastrada)
    console.log(atividadesSalvasBD)
    if (tarefaCadastrada.length == 0) {
        atividadesSalvasBD = [atividadeNova, ...atividadesSalvasBD]
        alert("Cadastro feito com Sucesso!")
        estadoComponenteAtividade(atividadesSalvasBD);
        textoTarefaCampo.style.border = "solid 1px gray"
    } else {
        alert("Atividade já cadastrada.")
        textoTarefaCampo.style.border = "solid 1px red"
    }
    textoTarefa.value = "";
    setTimeout(() => {
        textoTarefaCampo.style.border = "solid 1px gray"
    }, '5000')

})


criarDataSelec(diasSelect);
criarHoraSelect();
estadoComponenteAtividade(atividadesSalvasBD);

