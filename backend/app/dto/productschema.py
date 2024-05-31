from pydantic import BaseModel
from typing import Optional


class ReviewSchema(BaseModel):
    user_id: int
    name: str
    comment: str
    rating: int


class ProductSchema(BaseModel):
    name: str
    image: str
    category: int
    description: str
    price: int
    countInStock: int
    rating: Optional[int]
    type: int
    sort: int
    season: int

