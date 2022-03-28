describe Api::V1::EntitiesController do
  let(:text) { 'Apple' }
  let(:type) { 'ORG' }
  let(:params) do
    {
      text: text,
      type: type
    }
  end

  context 'create' do
    let(:body_res) do
      post "/api/v1/sentences/#{sentence.id}/entities", params: params
      JSON.parse(response.body)
    end

    context 'given a sentence' do
      let(:sentence) { Sentence.create(text: 'Apple is looking at buying UK startup for  $1 billion') }

      it 'should create one entity' do
        expect(body_res).to include params.as_json
      end
    end
  end
end
