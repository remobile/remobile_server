import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql';
import authorize from '../../authorize';
import VersionModel from '../../../models/version';
import {versionType} from '../../queries/version/version';

const versionInputType = new GraphQLInputObjectType({
    name: 'versionInputType',
    fields: {
        verName: {type: GraphQLString},
        verCode: {type: GraphQLString},
        androidJsVersion: {type: GraphQLString},
        iosJsVersion: {type: GraphQLString},
    }
});

export default {
    type: versionType,
    args: {
        data: {
            type: new GraphQLNonNull(versionInputType)
        }
    },
    async resolve (root, params) {
        authorize(root);

        const versionModel = new VersionModel(params.data);
        const version = await versionModel.save();

        if (!version) {
            throw new Error('Error adding new version');
        }

        return version;
    }
};