import SectionTitle from "$store/components/ui/SectionTitle.tsx";

export interface Props {
  description: string;
}

function ProductDescription({ description }: Props) {
  return (
    <div class="sm:mt-6 border-t-8 border-gray-100 pt-6">
      <SectionTitle title="Detalhes" />
      <div
        class="mt-6 px-4 font-body text-body overflow-hidden"
        dangerouslySetInnerHTML={{
          __html:
            'Devido a problemas com as descriçoes de produtos vindo com JS e CDNs estou tirando uma licença poetica para deixar a mesma descriçao em todos os produtos. <p>Com rolo de treino você vai poder pedalar sempre que quiser! <br/><br/>Para você que é apaixonado por pedalar ou está iniciando, com certeza vale a pena o investimento para transformar a sua bicicleta em um modelo ergométrico em poucos minutos. Possui ajuste de resistência com 6 níveis, e o seletor pode ser preso no guidão.<br/><br/>- Carga máxima de 150kg;<br/>- Compatível com bicicletas aro 26", 27,5", 29" e 700c;<br/>- Acompanha blocagem própria para uso no rolo e suporte da roda dianteira (bicicletas com eixo passante necessitam de adaptador não incluso).<br/><br/>Imagens meramente ilustrativas.</p>',
        }}
      />
    </div>
  );
}

export default ProductDescription;
