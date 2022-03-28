class Entity < ApplicationRecord
  belongs_to :sentence

  ### STI
  self.inheritance_column = nil
end
