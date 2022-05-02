describe Api::V1::SentencesController do
  let(:text) { 'Apple is looking at buying UK startup for  $1 billion' }
  let(:params) do
    {
      text: text,
    }
  end

  context 'create' do
    let(:body_res) do
      post "/api/v1/sentences", params: params
      JSON.parse(response.body)
    end

    context 'given a sentence' do
      let(:sentence) { Sentence.create(text: text) }

      it 'should create one entity' do
        expect(body_res['sentence']).to include params.as_json
      end
    end
  end

  context 'update' do
    let(:body_res) do
      put "/api/v1/sentences/#{sentence.id}", params: params
      JSON.parse(response.body)
    end

    context 'given a sentence and an entity' do
      let(:sentence) { Sentence.create(text: 'text with typo') }

      it 'should update one entity' do
        expect(body_res['sentence']).to include params.as_json
      end
    end
  end
end
