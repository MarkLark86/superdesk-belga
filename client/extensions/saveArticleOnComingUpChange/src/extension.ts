import {
    ISuperdesk,
    IExtension,
    IExtensionActivationResult,
    IArticle,
} from 'superdesk-api';

const extension: IExtension = {
    id: 'saveArticleOnComingUpChange',
    activate: (superdesk: ISuperdesk) => {
        const result: IExtensionActivationResult = {
            contributions: {
                authoring: {
                    onUpdateAfter: (current: IArticle, next: IArticle) => {
                        if (
                            // Only trigger save on toggle
                            (current.extra?.DueBy == null || next.extra?.DueBy == null) &&
                            current.extra?.DueBy !== next.extra?.DueBy
                        ) {
                            superdesk.ui.article.save();
                        }
                        return Promise.resolve(next);
                    },
                },
            },
        };

        return Promise.resolve(result);
    },
};

export default extension;
