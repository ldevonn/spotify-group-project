from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import PlaylistsTracks, Like

class Track(db.Model):
    __tablename__ = 'tracks'
    album = relationship("Album", back_populates="tracks")
    playlists = relationship('Track', secondary=PlaylistsTracks, back_populates='tracks')
    user_likes = relationship('Track', secondary=Like, back_populates='track_likes')

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    file = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    album_id = db.Column(db.Integer, ForeignKey('albums.id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'name': self.name,
            'duration': self.duration,
            'file': self.file,
            'trackId': self.id,
            'artistId': self.artist_id,
            'albumId': self.album_id
        }

# class Child(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     parent_id = db.Column(db.Integer, ForeignKey('parent.id', ondelete='CASCADE'))
#     parent = relationship("Parent", back_populates="children")