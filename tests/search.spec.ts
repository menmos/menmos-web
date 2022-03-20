import { login } from './utils'

describe('Search', () => {
  it('Should log in programmatically without using the UI', () => {
    login()

    cy.visit('/web')
  })

  it('Should search for blobs with a given tag', async () => {
    cy.get('#search').type('images')

    cy.intercept('POST', 'http://localhost:3030/query', {
      statusCode: 200,
      body: {
        count: 6,
        total: 6,
        hits: [
          {
            id: '7a59dee3-b114-4ac3-a4c0-c204fd93bdc5',
            meta: {
              fields: { name: 'test-images' },
              tags: ['images'],
              size: 0,
              created_at: '2022-02-25T01:07:27.920927289Z',
              modified_at: '2022-02-25T01:07:27.920927289Z'
            },
            url: 'http://localhost:3031/blob/7a59dee3-b114-4ac3-a4c0-c204fd93bdc5?signature=5K7u5zVynH3zojuFIMJdb7h4a2yTYeW9Yr8sRwqMO1lfWAI1ufZ4llBynXGVShxTgLac6mT8QVYiIjUFAQS0CeuOilElzBvk4Rskwa191aUr6uGA8A1o1FuWDoW2GlMdThfAN9U37moh6yE6H22eq8P'
          },
          {
            id: '9ea6d43e-24a7-465d-8f5b-62111d7ea3d4',
            meta: {
              fields: {
                'content-type': 'image/png',
                extension: 'png',
                parent: '7a59dee3-b114-4ac3-a4c0-c204fd93bdc5',
                name: 'Shrek.png'
              },
              tags: ['images'],
              size: 364_119,
              created_at: '2022-02-25T01:07:27.934023622Z',
              modified_at: '2022-02-25T01:07:27.934023622Z'
            },
            url: 'https://lh3.googleusercontent.com/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc=w600'
          },
          {
            id: '5e5fe919-0b6f-4557-85ae-6011a26b7fe9',
            meta: {
              fields: {
                name: 'duck.jpg',
                'content-type': 'image/jpeg',
                parent: '7a59dee3-b114-4ac3-a4c0-c204fd93bdc5',
                extension: 'jpg'
              },
              tags: ['images'],
              size: 154_240,
              created_at: '2022-02-25T01:07:27.981292982Z',
              modified_at: '2022-02-25T01:07:27.981292982Z'
            },
            url: 'https://i.redd.it/jeuusd992wd41.jpg'
          },
          {
            id: 'a01a53b8-78bc-4ffd-a240-4ab52554b5a2',
            meta: {
              fields: {
                'content-type': 'image/jpeg',
                parent: '7a59dee3-b114-4ac3-a4c0-c204fd93bdc5',
                name: 'homer.jpg',
                extension: 'jpg'
              },
              tags: ['images'],
              size: 335_750,
              created_at: '2022-02-25T01:07:27.991626396Z',
              modified_at: '2022-02-25T01:07:27.991626396Z'
            },
            url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg'
          },
          {
            id: 'e1ba42a1-4325-4cd6-a8bc-adb3aabfd418',
            meta: {
              fields: { name: 'Downloads' },
              tags: ['images'],
              size: 0,
              created_at: '2022-02-25T02:14:01.693466297Z',
              modified_at: '2022-02-25T02:14:01.693466297Z'
            },
            url: 'http://localhost:3031/blob/e1ba42a1-4325-4cd6-a8bc-adb3aabfd418?signature=5K7u5zW0UKjrtgc112mArYs8xiNSBEdGyty1FxY2rdSUvjWxYJRsD7VvHT3TK22FFEqxi9oaykNsWKyqaSbp1ULzqbaUX4yYWZqdGGiuGBx2KzB6V79jvHgC2rYEyxYwilZDuycJOTIEI42ybsdWjEx'
          },
          {
            id: '0cfbc37f-bc5d-4d31-867a-4166b23b36fc',
            meta: {
              fields: {
                extension: 'pdf',
                name: 'file.pdf',
                'content-type': 'application/pdf',
                parent: 'e1ba42a1-4325-4cd6-a8bc-adb3aabfd418'
              },
              tags: ['images'],
              size: 858_037,
              created_at: '2022-02-25T02:14:01.760559311Z',
              modified_at: '2022-02-25T02:14:01.760559311Z'
            },
            url: 'http://localhost:3031/blob/0cfbc37f-bc5d-4d31-867a-4166b23b36fc?signature=5K7u5zVzzgnKgJY6Giytkji4GlzjISAyxm32B41aMqCP1lhsOLLPa7ltYflLN5Dgok1V310fjR9MQw6MoKnxg8YjLUCOMq1Q9uQimQOCBk83KzPt1SFYa37Yg6FiDETlGbotnkzbPKAZE4BJyUH9XGo'
          }
        ],
        facets: {
          tags: { images: 6 },
          meta: {
            extension: { png: 1, jpg: 2, pdf: 1 },
            'content-type': { 'application/pdf': 1, 'image/png': 1, 'image/jpeg': 2 },
            name: {
              'Shrek.png': 1,
              'homer.jpg': 1,
              'test-images': 1,
              'duck.jpg': 1,
              Downloads: 1,
              'file.pdf': 1
            },
            parent: {
              'e1ba42a1-4325-4cd6-a8bc-adb3aabfd418': 1,
              '7a59dee3-b114-4ac3-a4c0-c204fd93bdc5': 3
            }
          }
        }
      }
    }).as('search')

    cy.wait('@search')

    // Wait 2 sec for the blobs to display
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })

    cy.compareSnapshot('search', 0.1)
  })
})
