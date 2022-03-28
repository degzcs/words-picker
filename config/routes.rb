Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sentences do
        resources :entities, only: [:create, :update, :destroy]
      end
    end
  end
  root 'single_page#index'
  get '/*path' => 'single_page#index'
end
