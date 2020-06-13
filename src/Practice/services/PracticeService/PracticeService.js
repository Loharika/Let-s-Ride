const Details = {
   name: 'FaceMask',
   description:
      'A face mask is a device that you wear over your face, for example to prevent yourself from breathing bad air or from spreading germs, or to protect your face when you are in a dangerous situation. 2. countable noun. A face mask is the same as a face pack.',
   imgUrl:
      'https://ml7kf5kbrme3.i.optimole.com/wa_4u1A-FBVuMv93/w:800/h:800/q:90/https://jdgoshop.com/wp-content/uploads/2020/03/575330870985.jpg'
}
const ResourceItems = {
   data: [
      {
         name: 'Surgical Masks',
         imgUrl: ''
      },
      {
         name: 'N95 Respirators',
         imgUrl: ''
      },
      {
         name: 'Face Masks',
         imgUrl: ''
      }
   ]
}

class PracticeService {
   getResourceDetailsAPI() {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(Details)
         }, 3000)
      })
   }
   getResourceItemsAPI() {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(ResourceItems)
         }, 3000)
      })
   }
}
export { PracticeService }
