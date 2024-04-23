import "./AddAds.css";
import { uploads } from "../../utils/config";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateAds, getAdsDetails } from "../../Slice/adsSlice";
import Message from "../../Components/Messages/Message";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const UpdateAds = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { add, loading, error, message } = useSelector((state) => state.ads);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tell, setTell] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [typeOfRealty, setTypeOfRealty] = useState("");
  const [methodOfSale, setMethodOfSale] = useState("");
  const [landMeasurement, setLandMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [adsImages, setAdsImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (add) {
      setTitle(add.title || "");
      setDescription(add.description || "");
      setAddress(add.address || "");
      setDistrict(add.district || "");
      setCity(add.city || "");
      setTypeOfRealty(add.typeOfRealty || "");
      setMethodOfSale(add.methodOfSale || "");
      setLandMeasurement(add.landMeasurement || "");
      setPrice(add.price || "");
      setTell(add.tell || "");
      setWhatsapp(add.whatsapp || "");
      setExistingImages(add.images || []);
    }
  }, [add]);

  const handleDragEnd = (result) => {
    // Verificar se a operação de arrastar e soltar foi completada com sucesso
    if (!result.destination) {
      return;
    }

    // Obter as posições inicial e final da imagem arrastada
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    // Reordenar as imagens no estado de acordo com a posição inicial e final
    const reorderedImages = Array.from(adsImages);
    const [removed] = reorderedImages.splice(startIndex, 1);
    reorderedImages.splice(endIndex, 0, removed);

    // Atualizar o estado das imagens
    setAdsImages(reorderedImages);
  };

  const handleFile = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = [];
      const newImagePreviews = [];

      // Processar cada arquivo
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Adicionar o arquivo à lista de novas imagens
        newImages.push(file);

        // Criar a pré-visualização usando URL.createObjectURL
        newImagePreviews.push(URL.createObjectURL(file));
      }

      // Atualizar as pré-visualizações e as imagens
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);
      setAdsImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("typeOfRealty", typeOfRealty);
    formData.append("methodOfSale", methodOfSale);
    formData.append("landMeasurement", landMeasurement);
    formData.append("price", price);
    formData.append("tell", tell);
    formData.append("whatsapp", whatsapp);

    // Adicionar novas imagens
    adsImages.forEach((images) => formData.append("images", images));

    dispatch(updateAds(formData));
    navigate(`/ads/${id}`);
  };
  return (
    <div className="updateAds">
      <h1>
        <span>Atualizar</span> anúncio de imóvel
      </h1>
      <h3>Altere os campos abaixo para atualizar o anúncio</h3>
      <form onSubmit={handleSubmit}>
        {/* Input para carregar imagens */}
        <label htmlFor="arquivo" className="foto-perfil">
          <span id="buttonFile">Carregar imagens do imóvel</span>
          <input
            type="file"
            onChange={handleFile}
            name="arquivo"
            id="arquivo"
            multiple
          />
        </label>
        <div className="imagePreviews">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="imagePreviews"
                >
                  {imagePreviews.map((preview, index) => (
                    <Draggable key={index} draggableId={index} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={preview} alt={`Preview ${index + 1}`} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <p className="obs">
          Adicionando novas imagens, as imagens antigas serão removidas.
        </p>
        <label>
          <span>Título do anúncio</span>
          <input
            type="text"
            placeholder="título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
          />
        </label>
        <label>
          <span>Descrição do imóvel</span>
          <textarea
            placeholder="Escreva o depoimento"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Categoria do imóvel</span>
          <select
            onChange={(e) => setTypeOfRealty(e.target.value)}
            value={typeOfRealty || ""}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </label>
        <label>
          <span>Endereço</span>
          <input
            type="text"
            placeholder="endereço"
            onChange={(e) => setAddress(e.target.value)}
            value={address || ""}
            required
          />
        </label>
        <label>
          <span>Bairro</span>
          <input
            type="text"
            placeholder="bairro"
            onChange={(e) => setDistrict(e.target.value)}
            value={district || ""}
            required
          />
        </label>
        <label>
          <span>Cidade</span>
          <input
            type="text"
            placeholder="cidade"
            onChange={(e) => setCity(e.target.value)}
            value={city || ""}
            required
          />
        </label>
        <label>
          <span>Tamanho do imóvel (m2)</span>
          <input
            type="number"
            placeholder="tamanho"
            onChange={(e) => setLandMeasurement(e.target.value)}
            value={landMeasurement}
            required
          />
        </label>
        <label>
          <span>Preço do imóvel</span>
          <input
            type="number"
            placeholder="preço"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </label>
        <label>
          <span>Método de negócio</span>
          <select
            onChange={(e) => setMethodOfSale(e.target.value)}
            value={methodOfSale || ""}
            required
          >
            <option value="">Selecione um método</option>
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
            <option value="Aluguel e venda">Aluguel e venda</option>
          </select>
        </label>
        <label>
          <span>Telefone do vendedor</span>
          <input
            type="text"
            placeholder="telefone"
            onChange={(e) => setTell(e.target.value)}
            value={tell || ""}
            required
          />
        </label>
        <label>
          <span>Whatsapp do vendedor</span>
          <input
            type="text"
            placeholder="whatsapp"
            onChange={(e) => setWhatsapp(e.target.value)}
            value={whatsapp || ""}
            required
          />
        </label>
        {!loading ? (
          <input type="submit" value="Atualizar anúncio" />
        ) : (
          <input type="submit" disabled value="Aguarde..." />
        )}
        {/* Mensagens de erro ou sucesso */}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default UpdateAds;
