/// <reference types="react-scripts" />

interface Snippet {
  [id: string]: any,
  title: string;
  addedBy: User['username'];
  language: string;
  description: string;
  value: string;
  tags: string[];
  likedBy: Array<User['username']>;
  addedOn: string;
  updatedOn: string;
  collection: Array<Collection>;
  private: boolean;
}

// class Snippet(db.Document):
//     meta = {'collection': 'snippet'}
//     title = db.StringField(required=True, unique=True)

//     filename = db.StringField()
//     category = db.StringField()
//     tags = db.ListField(db.StringField())
//     description = db.StringField()
//     language = db.StringField(default='javascript')
//     value = db.StringField(required=True)

//     added_by = db.ReferenceField('User', required=True)
//     liked_by = db.ListField(db.ReferenceField('User'))
//     added_on = db.DateTimeField(required=True)
//     updated_on = db.DateTimeField()
//     private = db.BooleanField(default=False)

//     collection = db.ListField(db.ReferenceField('Collection'))

//     def __repr__(self):
//         return self.title

type searchBy = "title" | "language" | "tags" ;
type searchTerm = string;

type test = keyof typeof Snippet;
type test2 = typeof Snippet[test];

interface Options {
  value: string;
  label: string;
}

interface User {
  [id: string]: any,
  username: string;
  online: boolean;
  snippetsCreated: Array<Snippet>;
  snippetsLiked: Array<Snippet>;
  collections: Array<Collection>;
}

// class User(db.Document):
//     username = db.StringField(required=True, unique=True)
//     email = db.EmailField(required=True, unique=True)
//     password = db.StringField(required=True, min_length=6)
//     online = db.BooleanField(default=True)

//     snippets_created = db.ListField(db.ReferenceField('Snippet', reverse_delete_rule=db.PULL))
//     snippets_liked = db.ListField(db.ReferenceField('Snippet', reverse_delete_rule=db.PULL))

//     def hash_password(self):
//         self.password = generate_password_hash(self.password).decode('utf8')

//     def check_password(self, password):
//         return check_password_hash(self.password, password)

//     def __repr__(self):
//         return self.username

interface Collection {
  [id: string]: any,
  name: string;
  owner: User['username'];
  private: boolean;
  snippets: Array<Snippet['title']>;
}

// class Collection(db.Document):
//     name = db.StringField(required=True, unique=True)
//     owner = db.ReferenceField('User', required=True)
//     snippets = db.ListField(db.ReferenceField('Snippet'))
//     private = db.BooleanField(default=False)