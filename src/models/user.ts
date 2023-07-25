import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttributes {
    email: string;
    password: string;
}

// Interface qui décrit les propriétés qu'un model User aura
interface UserModel extends mongoose.Model<UserDoc> {
    build(attributes: UserAttributes): UserDoc;
}

// Une interface qui décrit les propriétés qu'un Document User aura
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Avant de sauvegarder le document, on hash le mot de passe
userSchema.pre('save', async function (done) {
    // On vérifie que le mot de passe a été modifié pour éviter de le hasher à chaque fois qu'on sauvegarde le document
    // par exemple quand on met à jour l'email sans changer le mot de passe
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Une fonction qui permet à TypeScript de vérifier que nous créons un nouvel utilisateur avec les bons attributs
// Nous l'ajoutons à l'objet User pour que nous puissions l'appeler directement sur le modèle User (User.build)
userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };