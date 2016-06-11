export default [
    {
        /**
         * regular expression of URL
         */
        pattern: '(/api/contact)(/?\\d*)',

        /**
         * returns the data
         *
         * @param match array Result of the resolution of the regular expression
         * @param params object sent by 'send' function
         * @param headers object set by 'set' function
         */
        fixtures: function (match, params, headers) {
            /**
             * Returning error codes example:
             *   request.get('https://domain.example/404').end(function(err, res){
             *     console.log(err); // 404
             *     console.log(res.notFound); // true
             *   })
             */
            if (match[1] === '/404') {
                throw new Error(404);
            }

            /**
             * Checking on parameters example:
             *   request.get('https://domain.example/hero').send({superhero: "superman"}).end(function(err, res){
             *     console.log(res.body); // "Your hero: superman"
             *   })
             */

            if (match[0] === '/api/contact') {
                return [
                    { _id: '56bbd355c1ebe7c2a70429d3',dob: '6/20/1961 4:00:00 AM', sex: 'F', name: 'abc'},
                    { _id: '56c5d2bedd465e3844e1f822',dob: '2/18/1962 4:00:00 AM', sex: 'M', name: 'xyz'}
                ];
            }

            if(match[1] === '/api/contact' && match[2] !== ''){
                return { _id: '56bbd355c1ebe7c2a70429d3',dob: '6/20/1961 4:00:00 AM', sex: 'F', name: 'abc'}                ;
            }


            /**
            * Checking on headers example:
            *   request.get('https://domain.example/authorized_endpoint').set({Authorization: "9382hfih1834h"}).end(function(err, res){
            *     console.log(res.body); // "Authenticated!"
            *   })
            */

            if (match[1] === '/authorized_endpoint') {
                if(headers['Authorization']) {
                    return 'Authenticated!';
                } else {
                    throw new Error(401); // Unauthorized
                }
            }

        },

        /**
         * returns the result of the GET request
         *
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        get: function (match, data) {
            return {
                body: data
            };
        },

        /**
         * returns the result of the POST request
         *
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        post: function (match, data) {
            return {
                code: 201
            };
        },

        delete: function(match,data){
            return{
                code: 200
            }
        }
    }
];