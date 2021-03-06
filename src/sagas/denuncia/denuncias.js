import { fork, call, put, take } from 'redux-saga/effects';
import firebaseApp from '../../utils/firebaseUtils';

import {
  CRIAR_DENUNCIA_REQUISICAO, criarDenunciaSucesso,
} from '../../actions/criarDenunciaActions';

const denunciaInicial = {
  bairroAgressao: '',
  cidadeAgressao: '',
  dataAgressao: '',
  descricaoAgressao: '',
  enderecoAgressao: '',
  estadoAgressao: '',
  periodoAgressao: '',
  categoriaCrime: '',
  numeroBoletim: '',
  numeroProcesso: '',
  orgao: '',
  cidadeDenunciante: '',
  dataNascimentoDenunciante: '',
  emailDenunciante: '',
  generoDenunciante: '',
  nomeDenunciante: '',
  racaDenunciante: '',
  telefoneDenunciante: '',
  cidadeVitima: '',
  dataNascimentoVitima: '',
  generoVitima: '',
  nomeVitima: '',
  racaVitima: '',
  souAVitima: '',
  telefoneVitima: '',
  dataNascimentoAgressor: '',
  nomeAgressor: '',
  racaAgressor: '',
  generoAgressor: '',
  bairroAgressor: '',
  cidadeAgressor: '',
  descricaoAgressor: '',
  estadoAgressor: ''
};

export function criarDenuncia(acao) {
  const ref = firebaseApp.database().ref();
  const refDenuncias = ref.child('denuncias');
  const dados = Object.assign({}, denunciaInicial, acao.payload);

  const idDenuncia = refDenuncias.push({
    agressao: {
      bairro: dados.bairroAgressao,
      cidade: dados.cidadeAgressao,
      data: dados.dataAgressao,
      descricao: dados.dataAgressao,
      endereco: dados.enderecoAgressao,
      periodo: dados.periodoAgressao
    },
    informacoesLegais: {
      categoria: dados.categoriaCrime,
      numeroBoletim: dados.numeroBoletim,
      numeroProcesso: dados.numeroProcesso,
      orgao: dados.orgao,
    },
  }).getKey();

  const refPessoasEnvolvidas = ref.child('pessoasEnvolvidas').child(idDenuncia);
  refPessoasEnvolvidas.set({
    denunciante: {
      cidade: dados.cidadeDenunciante,
      dataNascimento: dados.dataNascimentoDenunciante,
      email: dados.emailDenunciante,
      genero: dados.generoDenunciante,
      nome: dados.nomeDenunciante,
      raca: dados.racaDenunciante,
      telefone: dados.telefoneDenunciante
    },
    vitima: {
      cidade: dados.cidadeVitima,
      dataNascimento: dados.dataNascimentoVitima,
      genero: dados.generoVitima,
      nome: dados.nomeVitima,
      raca: dados.racaVitima,
      souAVitima: dados.souAVitima,
      telefone: dados.telefoneVitima
    },
    agressor: {
      nome: dados.nomeAgressor,
      raca: dados.racaAgressor,
      dataNascimento: dados.dataNascimentoAgressor,
      genero: dados.generoAgressor,
      descricao: dados.descricaoAgressor,
      cidade: dados.cidadeAgressor,
      estado: dados.estadoAgressor,
      bairro: dados.bairroAgressor
    }
  });

  return idDenuncia;
}

export function* handleCriarDenunciaRequisicao() {
  while (true) {
    const acao = yield take(CRIAR_DENUNCIA_REQUISICAO);
    const idDenuncia = yield call(criarDenuncia, acao);
    yield put(criarDenunciaSucesso(idDenuncia));
  }
}

export default function* rootSaga() {
  yield fork(handleCriarDenunciaRequisicao);
}

