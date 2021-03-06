import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {authorize} from '../../authorize';
import AdministratorModel from '../../../models/administrator';
import {administratorType} from '../../types/administrator';

export default {
    type: administratorType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        authorize(root);

        return AdministratorModel
        .findByIdAndRemove(params.id)
        .exec()
        .then((removedAdministrator) => {
            if (!removedAdministrator) {
                throw new Error('Error removing administrator');
            }
            return removedAdministrator;
        });
    }
};
