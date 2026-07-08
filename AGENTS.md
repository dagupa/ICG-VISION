# AGENTS.md

# Propósito

Este proyecto está destinado a aplicaciones web utilizadas en entornos industriales y de fabricación, integradas con procesos de Excel, VBA y SAP.

Todas las modificaciones deben priorizar:

- Robustez
- Mantenibilidad
- Legibilidad
- Compatibilidad multiusuario
- Rendimiento
- Facilidad de soporte futuro

---

# Reglas Generales

## Analizar antes de modificar

Antes de realizar cualquier cambio:

1. Analizar el problema completo.
2. Identificar la causa raíz.
3. Explicar el impacto del cambio.
4. Buscar la solución más simple posible.
5. Evitar modificaciones innecesarias.

Nunca modificar código que no esté relacionado con el problema solicitado.

---

## Minimizar cambios

Siempre aplicar el mínimo cambio necesario.

Preferir:

- Corrección localizada
- Refactorización parcial

Evitar:

- Reescrituras completas
- Cambios masivos
- Cambios estéticos innecesarios

---

## No romper funcionalidades existentes

Antes de realizar modificaciones:

- Revisar dependencias.
- Revisar llamadas a funciones.
- Revisar eventos.
- Revisar estructuras de datos.

La prioridad es mantener la compatibilidad hacia atrás.

---

# Buenas prácticas HTML

## Estructura

Usar HTML semántico.

## Accesibilidad

Todos los controles deben disponer de label y texto descriptivo.

## IDs y nombres

Utilizar nombres descriptivos.

---

# Buenas prácticas CSS

## Organización

Separar layout, componentes y utilidades.

## Nombres descriptivos

Usar nombres legibles y mantenibles.

## No usar estilos inline

Utilizar clases CSS.

## Responsive

Compatible con Full HD, portátil y tablet.

---

# Buenas prácticas JavaScript

## No duplicar lógica

Crear funciones reutilizables.

## Funciones pequeñas

Responsabilidad única.

## Nombres claros

Variables y funciones autoexplicativas.

## Control de errores obligatorio

Usar try/catch en operaciones críticas.

## No usar valores mágicos

Definir constantes.

---

# Gestión de datos

## No perder datos del usuario

Validar antes de sobrescribir.

## Validaciones obligatorias

Controlar null, undefined y valores vacíos.

---

# Carga de CSV

- Validar existencia.
- Gestionar errores.
- Validar cabeceras.
- Informar claramente al usuario.

---

# Integración con SAP

## Principio fundamental

SAP puede responder lento.

## Automatizaciones robustas

Validar siempre pantalla, controles y carga de datos.

## Multiusuario

Compatible con variantes públicas y distintos entornos.

---

# Integración con Excel VBA

## Compatibilidad

Preferir rutas relativas mediante ThisWorkbook.Path.

## Tratamiento de errores

Implementar manejadores de errores.

## No detener procesos masivos

Registrar errores y continuar.

---

# Rendimiento

- Evitar cargas innecesarias.
- Optimizar DOM.
- Reducir renderizados repetidos.

---

# Experiencia de usuario

## Feedback visual obligatorio

Mostrar estados de proceso, éxito y error.

## Mensajes claros

Los mensajes deben indicar exactamente qué ha ocurrido.

---

# Git y Control de Versiones

## Antes de modificar

Analizar rama actual e impacto.

## Commits

Realizar commits pequeños y descriptivos.

---

# Seguridad

Nunca almacenar:

- Contraseñas
- Usuarios SAP
- Tokens
- Credenciales

---

# Regla principal para cualquier agente IA

1. Analizar.
2. Explicar.
3. Proponer.
4. Implementar únicamente lo solicitado.

La estabilidad del sistema tiene prioridad sobre la elegancia del código.

# Histórico de cambios

Cada prompt lo guardarás en el archivo prompting.txt y quedará registrado con el día y la hora en la que se ha lanzado.
A continuación del prompt añadirás la solución dada al respecto.
Si el archivo no exite lo crearás.

# Contexto
Añadirás al contexto de cada sesión lo registrado en el archivo prompting.txt