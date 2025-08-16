# Calculadora de Riesgos - CalNext

Sistema integral para la gestión y evaluación de riesgos empresariales desarrollado con Next.js.

## 🚀 Características

- **Formulario de Riesgos**: Captura detallada de riesgos con validación
- **Matriz de Riesgo**: Visualización interactiva de la matriz de evaluación
- **Planes de Contingencia**: Gestión de planes de respuesta ante riesgos
- **Planes de Mitigación**: Estrategias para reducir la probabilidad o impacto
- **Almacenamiento Local**: Persistencia de datos en el navegador
- **Interfaz Responsiva**: Diseño adaptativo para todos los dispositivos
- **Edición en Tiempo Real**: Modificación de riesgos existentes
- **Cálculo Automático**: Determinación automática del nivel de riesgo

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Estado**: React Hooks (useState, useEffect)
- **Almacenamiento**: localStorage

## 📋 Requisitos Previos

- Node.js 18.0 o superior
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd calNext
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue Automático

1. Conectar tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es una aplicación Next.js
3. El despliegue se realizará automáticamente

### Opción 2: Despliegue Manual

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Construir la aplicación**
   ```bash
   npm run build
   ```

3. **Desplegar**
   ```bash
   vercel
   ```

4. **Seguir las instrucciones en terminal**

## 📱 Uso de la Aplicación

### 1. Agregar Nuevo Riesgo
- Hacer clic en "Agregar Nuevo Riesgo"
- Completar todos los campos obligatorios:
  - Descripción del riesgo (mínimo 10 caracteres)
  - Nivel de impacto (Muy Bajo a Muy Alto)
  - Nivel de probabilidad (Muy Baja a Muy Alta)
  - Plan de contingencia (mínimo 20 caracteres)
  - Plan de mitigación (mínimo 20 caracteres)

### 2. Matriz de Riesgo
- Visualizar la matriz de evaluación
- Entender cómo se calcula el nivel de riesgo
- Consultar las recomendaciones por nivel

### 3. Gestión de Riesgos
- Ver lista de riesgos registrados
- Expandir detalles completos
- Editar información existente
- Eliminar riesgos

## 🎨 Estructura del Proyecto

```
calNext/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/             # Componentes React
│   ├── RiskCalculator.tsx # Componente principal
│   ├── RiskForm.tsx       # Formulario de riesgos
│   ├── RiskMatrix.tsx     # Matriz de riesgo
│   └── RiskList.tsx       # Lista de riesgos
├── types/                  # Tipos TypeScript
│   └── risk.ts            # Interfaces de riesgo
├── package.json            # Dependencias y scripts
├── tailwind.config.js      # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
├── vercel.json            # Configuración de Vercel
└── README.md              # Este archivo
```

## 🔍 Tipos de Riesgo

### Niveles de Impacto
- **Muy Bajo**: Impacto mínimo en operaciones
- **Bajo**: Impacto menor en procesos
- **Medio**: Impacto moderado en resultados
- **Alto**: Impacto significativo en objetivos
- **Muy Alto**: Impacto crítico en la organización

### Niveles de Probabilidad
- **Muy Baja**: Ocurre raramente (≤5%)
- **Baja**: Ocurre ocasionalmente (6-20%)
- **Media**: Ocurre a veces (21-50%)
- **Alta**: Ocurre frecuentemente (51-80%)
- **Muy Alta**: Ocurre casi siempre (≥81%)

### Niveles de Riesgo Resultantes
- **Bajo**: Verde - Riesgo aceptable
- **Medio**: Amarillo - Requiere atención
- **Alto**: Rojo - Requiere acción inmediata
- **Crítico**: Marrón - Requiere acción urgente

## 🚨 Validaciones

- **Descripción**: Mínimo 10 caracteres
- **Plan de Contingencia**: Mínimo 20 caracteres
- **Plan de Mitigación**: Mínimo 20 caracteres
- **Campos Obligatorios**: Todos los campos son requeridos

## 💾 Almacenamiento

Los datos se almacenan en el `localStorage` del navegador, lo que significa:
- Los datos persisten entre sesiones
- Los datos son específicos del navegador/dispositivo
- No hay sincronización entre dispositivos
- Los datos se mantienen hasta que se borren manualmente

## 🔧 Scripts Disponibles

- `npm run dev`: Ejecuta en modo desarrollo
- `npm run build`: Construye para producción
- `npm run start`: Ejecuta en modo producción
- `npm run lint`: Ejecuta el linter

## 🌟 Características Avanzadas

- **Cálculo Automático**: El nivel de riesgo se calcula automáticamente
- **Edición Inline**: Modificar riesgos sin recargar la página
- **Vista Expandible**: Mostrar/ocultar detalles de cada riesgo
- **Responsive Design**: Funciona perfectamente en móviles y tablets
- **Persistencia de Datos**: Los riesgos se mantienen entre sesiones
- **Validación en Tiempo Real**: Feedback inmediato sobre errores

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo

## 🔮 Roadmap

- [ ] Base de datos persistente
- [ ] Autenticación de usuarios
- [ ] Exportación de reportes
- [ ] Notificaciones en tiempo real
- [ ] API REST para integración
- [ ] Dashboard con métricas
- [ ] Historial de cambios
- [ ] Colaboración en tiempo real

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
