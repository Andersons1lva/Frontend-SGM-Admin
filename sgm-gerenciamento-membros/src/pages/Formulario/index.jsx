import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import MembroService from "../../services/MembroService";
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { tokens } from "../../styles/theme";

// Regex patterns - agora todos utilizados no schema
const PHONE_REGEX = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/;
const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const RG_REGEX = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9]{1}$/;
const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
const CEP_REGEX = /^\d{5}-\d{3}$/;

const validationSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  sobrenome: yup.string().required("Sobrenome é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  idade: yup
    .number()
    .typeError("Idade deve ser um número")
    .required("Idade é obrigatória"),
  numero_celular: yup
    .string()
    .matches(PHONE_REGEX, "Formato: (99) 99999-9999")
    .required("Celular é obrigatório"),
  telefone_fixo: yup
    .string()
    .matches(PHONE_REGEX, "Formato: (99) 9999-9999")
    .nullable(),
  rg: yup
    .string()
    .matches(RG_REGEX, "Formato: 99.999.999-9")
    .required("RG é obrigatório"),
  cpf: yup
    .string()
    .matches(CPF_REGEX, "Formato: 999.999.999-99")
    .required("CPF é obrigatório"),
  data_nascimento: yup
    .string()
    .matches(DATE_REGEX, "Formato: DD/MM/AAAA")
    .required("Data de nascimento é obrigatória"),
  endereco: yup.object().shape({
    rua: yup.string().required("Rua é obrigatória"),
    numero: yup.string().required("Número é obrigatório"),
    complemento: yup.string(),
    cidade: yup.string().required("Cidade é obrigatória"),
    cep: yup
      .string()
      .matches(CEP_REGEX, "Formato: 99999-999")
      .required("CEP é obrigatório")
  })
});

const Form = ({ initialMemberData, onSubmitSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const isEditMode = Boolean(initialMemberData);

  const formataDataParaBrasil = (dateString) =>{
      if (!dateString) return "";

      try{
        const [yaer, month, day] = dateString.split('-');
        if (!day || !month || !yaer) return dateString;
        return `${day}/${month}/${yaer}`
      }catch{
        return dateString;
      }
  };

  const formatInitialData = (data) => {
    if (!data) return initialValues;
    
    return {
      nome: data.nome || "",
      sobrenome: data.sobrenome || "",
      email: data.email || "",
      idade: data.idade || "",
      numero_celular: data.numero_celular || "",
      telefone_fixo: data.telefone_fixo || "",
      rg: data.rg || "",
      cpf: data.cpf || "",
      nome_pai: data.nome_pai || "",
      data_nascimento: formataDataParaBrasil(data.data_nascimento) || "",
      data_batismo:formataDataParaBrasil(data.data_batismo) || "",
      nome_mae: data.nome_mae || "",
      naturalidade: data.naturalidade || "",
      nascionalidade: data.nascionalidade || "",
      funcao_ministerial: data.funcao_ministerial || "",
      sexo: data.sexo || "",
      estado_civil: data.estado_civil || "",
      data_casamento: formataDataParaBrasil(data.data_casamento) || "",
      tempo_membro: data.tempo_membro || "",
      endereco: {
        rua: data.endereco?.rua || "",
        numero: data.endereco?.numero || "",
        complemento: data.endereco?.complemento || "",
        cidade: data.endereco?.cidade || "",
        cep: data.endereco?.cep || "",
      },
    };
  };

  const handleSubmit = async (values,{ resetForm }) => {
    setError("");

    try {
      if (isEditMode) {
        await MembroService.editMembro(initialMemberData.id, values);
      } else {
        await MembroService.addMembro(values);
      }
      setSuccessMessage(
        isEditMode
          ? "Membro atualizado com sucesso!"
          : "Cadastro realizado com sucesso!"
      );
      resetForm();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          'Erro ao processar a requisição';
      setError(errorMessage);
      console.error("Erro:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="8px">
      <Header title={isEditMode ? "EDITAR MEMBRO" : "NOVO MEMBRO"} />
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{ mb: 2, background: `${colors.primary[400]} !important` }}
      >
        
      </Button>
      {successMessage && (
        <div style={{ color: "orange" }}>{successMessage}</div>
      )}{" "}
      {error && (
        <Box mb={2} color="error.main">
          {error}
        </Box>
      )}

      <Formik
        onSubmit={handleSubmit}
        initialValues={formatInitialData(initialMemberData)}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="8px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sobrenome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sobrenome}
                name="sobrenome"
                error={!!touched.sobrenome && !!errors.sobrenome}
                helperText={touched.sobrenome && errors.sobrenome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Idade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idade}
                name="idade"
                error={!!touched.idade && !!errors.idade}
                helperText={touched.idade && errors.idade}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número de Celular"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numero_celular}
                name="numero_celular"
                error={!!touched.numero_celular && !!errors.numero_celular}
                helperText={touched.numero_celular && errors.numero_celular}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefone fixo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefone_fixo}
                name="telefone_fixo"
                error={!!touched.telefone_fixo && !!errors.telefone_fixo}
                helperText={touched.telefone_fixo && errors.telefone_fixo}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Campo de endereço */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Rua"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endereco.rua}
                name="endereco.rua"
                error={!!touched.endereco?.rua && !!errors.endereco?.rua}
                helperText={touched.endereco?.rua && errors.endereco?.rua}
                sx={{ gridColumn: "span 4" }}
                onClick={() => setShowAddressFields(true)} // Mostra campos adicionais ao clicar
              />
              {/* Campos adicionais de endereço (somente exibidos se showAddressFields for true) */}
              {showAddressFields && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Número"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endereco.numero}
                    name="endereco.numero"
                    error={
                      !!touched.endereco?.numero && !!errors.endereco?.numero
                    }
                    helperText={
                      touched.endereco?.numero && errors.endereco?.numero
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Complemento"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endereco.complemento}
                    name="endereco.complemento"
                    error={
                      !!touched.endereco?.complemento &&
                      !!errors.endereco?.complemento
                    }
                    helperText={
                      touched.endereco?.complemento &&
                      errors.endereco?.complemento
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="CEP"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endereco.cep}
                    name="endereco.cep"
                    error={!!touched.endereco?.cep && !!errors.endereco?.cep}
                    helperText={touched.endereco?.cep && errors.endereco?.cep}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Cidade"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endereco.cidade}
                    name="endereco.cidade"
                    error={
                      !!touched.endereco?.cidade && !!errors.endereco?.cidade
                    }
                    helperText={
                      touched.endereco?.cidade && errors.endereco?.cidade
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                </>
              )}
              {/* Outros campos do formulário */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RG"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rg}
                name="rg"
                error={!!touched.rg && !!errors.rg}
                helperText={touched.rg && errors.rg}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CPF"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cpf}
                name="cpf"
                error={!!touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome do Pai"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome_pai}
                name="nome_pai"
                error={!!touched.nome_pai && !!errors.nome_pai}
                helperText={touched.nome_pai && errors.nome_pai}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Data de Nascimento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.data_nascimento}
                name="data_nascimento"
                error={!!touched.data_nascimento && !!errors.data_nascimento}
                helperText={touched.data_nascimento && errors.data_nascimento}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Data de Batismo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.data_batismo}
                name="data_batismo"
                error={!!touched.data_batismo && !!errors.data_batismo}
                helperText={touched.data_batismo && errors.data_batismo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome da Mãe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome_mae}
                name="nome_mae"
                error={!!touched.nome_mae && !!errors.nome_mae}
                helperText={touched.nome_mae && errors.nome_mae}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Naturalidade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.naturalidade}
                name="naturalidade"
                error={!!touched.naturalidade && !!errors.naturalidade}
                helperText={touched.naturalidade && errors.naturalidade}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nascionalidade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nascionalidade}
                name="nascionalidade"
                error={!!touched.nascionalidade && !!errors.nascionalidade}
                helperText={touched.nascionalidade && errors.nascionalidade}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Função Ministerial"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.funcao_ministerial}
                name="funcao_ministerial"
                error={
                  !!touched.funcao_ministerial && !!errors.funcao_ministerial
                }
                helperText={
                  touched.funcao_ministerial && errors.funcao_ministerial
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sexo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sexo}
                name="sexo"
                error={
                  !!touched.sexo && !!errors.sexo
                }
                helperText={
                  touched.sexo && errors.sexo
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Estado civil"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estado_civil}
                name="estado_civil"
                error={!!touched.estado_civil && !!errors.estado_civil}
                helperText={touched.estado_civil && errors.estado_civil}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Data de Casamento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.data_casamento}
                name="data_casamento"
                error={!!touched.data_casamento && !!errors.data_casamento}
                helperText={touched.data_casamento && errors.data_casamento}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tempo de Membro"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tempo_membro}
                name="tempo_membro"
                error={
                  !!touched.tempo_membro && !!errors.tempo_membro
                }
                helperText={
                  touched.tempo_membro && errors.tempo_membro
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="8.6px" marginBottom="4.6px">
              <Button type="submit" color="secondary" variant="contained">
                {isEditMode ? "Atualizar" : "Criar"} Membro
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  nome: "",
  sobrenome: "",
  email: "",
  idade: "",
  numero_celular: "",
  telefone_fixo: "",
  rg: "",
  cpf: "",
  nome_pai: "",
  data_nascimento: "",
  data_batismo: "",
  nome_mae: "",
  naturalidade: "",
  nascionalidade: "",
  funcao_ministerial: "",
  sexo: "",
  estado_civil: "",
  data_casamento: "",
  tempo_membro: "",
  endereco: {
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    cep: "",
  },
};

export default Form;