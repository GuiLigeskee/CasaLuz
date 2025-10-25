# 🎠 Carrossel Customizado - CasaLuz

## 📋 Resumo das Mudanças

### ❌ Removido:

- **Swiper.js** - Biblioteca externa que causava bugs em alguns navegadores
- Dependências do Swiper (importações e configurações)
- Estados desnecessários de slides

### ✅ Implementado:

- **Carrossel customizado** 100% React
- Componente reutilizável e confiável
- Melhor controle e personalização
- Compatibilidade garantida em todos os navegadores

---

## 🎯 Componente Carousel

### Localização:

```
frontend/src/Components/Carousel/
├── Carousel.jsx
└── Carousel.css
```

### Recursos Implementados:

#### 🎨 **Visual**

- ✅ Botões de navegação estilizados nas cores da marca
  - Azul primário (#08273c) como padrão
  - Dourado (#fdb303) ao hover
- ✅ Dots de paginação animados
  - Dot ativo em formato oval com cor dourada
  - Transições suaves
- ✅ Sombras e efeitos modernos
- ✅ Animações cubic-bezier para movimento natural

#### 🔧 **Funcionalidades**

- ✅ **Navegação por botões** (setas esquerda/direita)
- ✅ **Navegação por dots** (clicáveis)
- ✅ **Autoplay** configurável
- ✅ **Loop infinito** (volta ao início ao chegar no fim)
- ✅ **Responsividade automática**:
  - Desktop (>1350px): 4-5 itens
  - Tablet (1050-1350px): 3 itens
  - Mobile (720-1050px): 2 itens
  - Mobile pequeno (<720px): 1 item
- ✅ **Transições suaves** (500ms)
- ✅ **Prevenção de cliques múltiplos** durante transição
- ✅ **Controles condicionais** (só aparecem se necessário)

#### 📱 **Responsividade**

- Ajuste automático do número de itens por tela
- Botões redimensionados em dispositivos menores
- Dots adaptados para mobile
- Espaçamentos otimizados

---

## 🎯 Uso do Componente

### Exemplo Básico:

```jsx
import Carousel from "../../Components/Carousel/Carousel";

<Carousel itemsPerView={4} autoplay={true} autoplayDelay={5000}>
  {items.map((item) => (
    <YourComponent key={item.id} item={item} />
  ))}
</Carousel>;
```

### Props:

| Prop            | Tipo      | Padrão | Descrição                               |
| --------------- | --------- | ------ | --------------------------------------- |
| `children`      | ReactNode | -      | Elementos a serem exibidos no carrossel |
| `itemsPerView`  | number    | 4      | Número de itens visíveis no desktop     |
| `autoplay`      | boolean   | true   | Ativa/desativa autoplay                 |
| `autoplayDelay` | number    | 5000   | Delay entre slides (ms)                 |

---

## 🎨 Paleta de Cores Aplicada

### Botões de Navegação:

- **Normal**: `#08273c` (azul principal)
- **Hover**: `#fdb303` (dourado)
- **Sombra hover**: `rgba(253, 179, 3, 0.5)`

### Dots de Paginação:

- **Normal**: Borda `#08273c`
- **Hover**: Preenchido `#08273c`
- **Ativo**: Gradiente dourado `#fdb303 → #e5a103`
- **Sombra ativo**: `rgba(253, 179, 3, 0.4)`

---

## 📐 Breakpoints de Responsividade

### Desktop (>1350px)

- Botões: 50px × 50px
- Posição: ±25px das bordas
- Gap entre itens: 1.5em
- Dots: 12px

### Tablet (1050-1350px)

- Botões: 45px × 45px
- Posição: ±22px das bordas
- Gap entre itens: 1.2em
- Dots: 12px

### Mobile Grande (768-1050px)

- Botões: 40px × 40px
- Posição: ±20px das bordas
- Gap entre itens: 1em
- Dots: 10px

### Mobile (480-768px)

- Botões: 35px × 35px
- Posição: ±15px das bordas
- Gap entre itens: 0.8em
- Dots: 10px

### Mobile Pequeno (<480px)

- Botões: 30px × 30px
- Posição: ±10px das bordas
- Gap entre itens: 0.5em
- Dots: 8px

---

## ✨ Vantagens do Carrossel Customizado

### 🚀 Performance

- Sem dependências externas pesadas
- Código otimizado e enxuto
- Carregamento mais rápido

### 🎯 Controle Total

- Personalização completa do estilo
- Comportamento sob medida
- Fácil manutenção e debug

### 🔒 Confiabilidade

- Funciona em todos os navegadores modernos
- Sem bugs de compatibilidade
- Código testado e estável

### 🎨 Identidade Visual

- Totalmente alinhado com as cores da marca
- Transições e animações consistentes
- Design moderno e profissional

---

## 🔄 Migração do Swiper

### Antes (Swiper):

```jsx
<Swiper
  slidesPerView={slidePerView}
  loop={true}
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000 }}
  navigation={true}
  modules={[Pagination, Navigation, Autoplay]}
>
  {items.map((item) => (
    <SwiperSlide key={item.id}>
      <Component item={item} />
    </SwiperSlide>
  ))}
</Swiper>
```

### Depois (Carousel):

```jsx
<Carousel itemsPerView={4} autoplay={true} autoplayDelay={5000}>
  {items.map((item) => (
    <Component key={item.id} item={item} />
  ))}
</Carousel>
```

**Mais simples, mais limpo, mais confiável!** ✨

---

## 📦 Arquivos Modificados

1. ✅ `Carousel.jsx` - Componente principal (NOVO)
2. ✅ `Carousel.css` - Estilização completa (NOVO)
3. ✅ `Home.jsx` - Implementação do carrossel
4. ✅ `Home.css` - Ajustes de estilo

---

## 🎯 Próximas Melhorias Sugeridas

1. **Swipe em dispositivos touch** (gesto de arrastar)
2. **Lazy loading de imagens** para performance
3. **Animações de entrada** (fade-in, slide-in)
4. **Pausar autoplay ao hover** (UX)
5. **Teclado navegável** (acessibilidade)

---

**Desenvolvido com ❤️ para CasaLuz**
_Carrossel 100% customizado e confiável!_
