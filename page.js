'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [formData, setFormData] = useState({
    pet: { owner_id: '', name: '', species_id: '', breed_id: '', dob: '' },
    owner: { name: '', contactDetails: '', address: '' },
    species: { speciesName: '' },
    breed: { breedName: '', species_id: '' }
  });
  const [editIndex, setEditIndex] = useState(null);
  const [currentForm, setCurrentForm] = useState('pets');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [currentForm]: { ...prevFormData[currentForm], [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentForm === 'pets') {
      setPets([...pets, formData.pet]);
    } else if (currentForm === 'owners') {
      setOwners([...owners, formData.owner]);
    } else if (currentForm === 'species') {
      setSpecies([...species, formData.species]);
    } else if (currentForm === 'breeds') {
      setBreeds([...breeds, formData.breed]);
    }
    setFormData(prevFormData => ({
      ...prevFormData,
      [currentForm]: Object.keys(prevFormData[currentForm]).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {})
    }));
  };

  const handleEdit = (index) => {
    if (currentForm === 'pets') {
      setFormData({ ...formData, pet: pets[index] });
    } else if (currentForm === 'owners') {
      setFormData({ ...formData, owner: owners[index] });
    } else if (currentForm === 'species') {
      setFormData({ ...formData, species: species[index] });
    } else if (currentForm === 'breeds') {
      setFormData({ ...formData, breed: breeds[index] });
    }
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (currentForm === 'pets') {
      setPets(pets.filter((_, i) => i !== index));
    } else if (currentForm === 'owners') {
      setOwners(owners.filter((_, i) => i !== index));
    } else if (currentForm === 'species') {
      setSpecies(species.filter((_, i) => i !== index));
    } else if (currentForm === 'breeds') {
      setBreeds(breeds.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-bold mb-6 mt-2 ml-5 text-left fade-in fade-in-1">Dashboard</h1>

      <div className="mb-6">
        <button
          onClick={() => setCurrentForm('pets')}
          className={`mr-2 py-2 px-4 rounded-lg ${currentForm === 'pets' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Pets
        </button>
        <button
          onClick={() => setCurrentForm('owners')}
          className={`mr-2 py-2 px-4 rounded-lg ${currentForm === 'owners' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Owners
        </button>
        <button
          onClick={() => setCurrentForm('species')}
          className={`mr-2 py-2 px-4 rounded-lg ${currentForm === 'species' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Species
        </button>
        <button
          onClick={() => setCurrentForm('breeds')}
          className={`py-2 px-4 rounded-lg ${currentForm === 'breeds' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Breeds
        </button>
      </div>

      <div className="flex justify-between space-x-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-1/4 fade-in fade-in-2">
          <h2 className="text-2xl font-bold mb-4">Add {currentForm.charAt(0).toUpperCase() + currentForm.slice(1)}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {currentForm === 'pets' && (
              <>
                <div>
                  <label className="block mb-1 text-sm">Owner</label>
                  <select
                    name="owner_id"
                    value={formData.pet.owner_id}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  >
                    <option value="">Select Owner</option>
                    {owners.map((owner, index) => (
                      <option key={index} value={owner.name}>
                        {owner.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Pet's Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.pet.name}
                    onChange={handleChange}
                    placeholder="Pet's Name"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Species</label>
                  <select
                    name="species_id"
                    value={formData.pet.species_id}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  >
                    <option value="">Select Species</option>
                    {species.map((specie, index) => (
                      <option key={index} value={specie.speciesName}>
                        {specie.speciesName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Breed</label>
                  <select
                    name="breed_id"
                    value={formData.pet.breed_id}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  >
                    <option value="">Select Breed</option>
                    {breeds.map((breed, index) => (
                      <option key={index} value={breed.breedName}>
                        {breed.breedName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.pet.dob}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  />
                </div>
              </>
            )}

            {currentForm === 'owners' && (
              <>
                <div>
                  <label className="block mb-1 text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.owner.name}
                    onChange={handleChange}
                    placeholder="Owner's Name"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Contact Details</label>
                  <input
                    type="text"
                    name="contactDetails"
                    value={formData.owner.contactDetails}
                    onChange={handleChange}
                    placeholder="Contact Details"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.owner.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  />
                </div>
              </>
            )}

            {currentForm === 'species' && (
              <div>
                <label className="block mb-1 text-sm">Species Name</label>
                <input
                  type="text"
                  name="speciesName"
                  value={formData.species.speciesName}
                  onChange={handleChange}
                  placeholder="Species Name"
                  className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                />
              </div>
            )}

            {currentForm === 'breeds' && (
              <>
                <div>
                  <label className="block mb-1 text-sm">Breed Name</label>
                  <input
                    type="text"
                    name="breedName"
                    value={formData.breed.breedName}
                    onChange={handleChange}
                    placeholder="Breed Name"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Species</label>
                  <select
                    name="species_id"
                    value={formData.breed.species_id}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
                  >
                    <option value="">Select Species</option>
                    {species.map((specie, index) => (
                      <option key={index} value={specie.speciesName}>
                        {specie.speciesName}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              {editIndex !== null ? 'Update' : 'Add'} {currentForm.charAt(0).toUpperCase() + currentForm.slice(1)}
            </button>
          </form>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-3/4 fade-in fade-in-3">
          <h2 className="text-2xl font-bold mb-4">Manage {currentForm.charAt(0).toUpperCase() + currentForm.slice(1)}</h2>
          <table className="w-full bg-gray-700 rounded-lg text-sm">
            <thead>
              <tr>
                {currentForm === 'pets' && (
                  <>
                    <th className="p-2 text-left">Owner</th>
                    <th className="p-2 text-left">Pet's Name</th>
                    <th className="p-2 text-left">Species</th>
                    <th className="p-2 text-left">Breed</th>
                    <th className="p-2 text-left">Date of Birth</th>
                    <th className="p-2 text-left">Actions</th>
                  </>
                )}
                {currentForm === 'owners' && (
                  <>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Contact Details</th>
                    <th className="p-2 text-left">Address</th>
                    <th className="p-2 text-left">Actions</th>
                  </>
                )}
                {currentForm === 'species' && (
                  <>
                    <th className="p-2 text-left">Species Name</th>
                    <th className="p-2 text-left">Actions</th>
                  </>
                )}
                {currentForm === 'breeds' && (
                  <>
                    <th className="p-2 text-left">Breed Name</th>
                    <th className="p-2 text-left">Species</th>
                    <th className="p-2 text-left">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentForm === 'pets' &&
                pets.map((pet, index) => (
                  <tr key={index}>
                    <td className="p-2">{pet.owner_id}</td>
                    <td className="p-2">{pet.name}</td>
                    <td className="p-2">{pet.species_id}</td>
                    <td className="p-2">{pet.breed_id}</td>
                    <td className="p-2">{pet.dob}</td>
                    <td className="p-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded-lg mr-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-lg"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {currentForm === 'owners' &&
                owners.map((owner, index) => (
                  <tr key={index}>
                    <td className="p-2">{owner.name}</td>
                    <td className="p-2">{owner.contactDetails}</td>
                    <td className="p-2">{owner.address}</td>
                    <td className="p-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded-lg mr-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-lg"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {currentForm === 'species' &&
                species.map((specie, index) => (
                  <tr key={index}>
                    <td className="p-2">{specie.speciesName}</td>
                    <td className="p-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded-lg mr-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-lg"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {currentForm === 'breeds' &&
                breeds.map((breed, index) => (
                  <tr key={index}>
                    <td className="p-2">{breed.breedName}</td>
                    <td className="p-2">{breed.species_id}</td>
                    <td className="p-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded-lg mr-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-lg"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
