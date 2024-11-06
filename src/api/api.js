export const getPaises = async () => {
  const response = await fetch('http://localhost/paises/apipaises/route.php?option=list_paises&limit=10&order=nombre&order_dir=desc');
  const result = await response.json();

  if (result.status === 200) {
      return result.data; 
  } else {
      throw new Error('Error al cargar los países');
  }
};

export const getProvincias = async (countryId) => {
  const response = await fetch(`http://localhost/paises/apipaises/route.php?option=list_provincias&idPais=${countryId}&limit=10&order=nombre&order_dir=desc`);
  const result = await response.json();

  if (result.status === 200) {
      return result.data;
  } else {
      throw new Error('Error al cargar las provincias');
  }
};

export const getLocalidades = async (provinceId) => {
  const response = await fetch(`http://localhost/paises/apipaises/route.php?option=list_localidades&idProvincia=${provinceId}&limit=10&order=nombre&order_dir=desc`);
  const result = await response.json();

  if (result.status === 200) {
      return result.data;
  } else {
      throw new Error('Error al cargar las localidades');
  }
};


export const guardarRecorrido = async (localidadId, recorrido) => {
  const response = await fetch('http://localhost/api/guardarRecorrido', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idLocalidad: localidadId, recorrido })
  });
  return response.json();
};
