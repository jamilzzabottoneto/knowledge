const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id
        try {
            existsOrError(article.name, 'Nome Não Informado!!!')
            existsOrError(article.description, 'Descrição Não Informada!!!')
            existsOrError(article.categoryId, 'Categoria Não Informada!!!')
            existsOrError(article.userId, 'Autor Não Informado!!!')
            existsOrError(article.content, 'Conteúdo Não Informado!!!')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send('Artigo Atualizado com Sucesso!!!'))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send('Artigo Inserido com Sucesso!!!'))
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        try {
            const rownsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rownsDeleted, 'Artigo Não Encontrado!!!')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send('Artigo Removido com Sucesso!!!')

        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 5 // usado para paginação

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', {author: 'u.name'})
            .limit(limit)
            .offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id }).first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoyWithChildren, categoryId)

        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }

}