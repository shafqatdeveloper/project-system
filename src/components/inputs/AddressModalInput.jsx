import { useEffect, useRef, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { RxCross2 } from "react-icons/rx";
import DropdownInput from "./DropdownInput";
import { City, Country, State } from "country-state-city";
import { getStatesOfCountry } from "country-state-city/lib/state";
import NormalInput from "./NormalInput";
import CountrySelectInput from "./CountrySelectInput";
import CitySelectInput from "./CitySelectInput";

const AddressModalInput = ({ label, value, setValue }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleToggleModal = () => setModalOpen(!modalOpen);
  const allCountriesRef = useRef(Country.getAllCountries());
  const allStateRef = useRef(State.getAllStates());
  const [countrySelected, setCountrySelected] = useState(value.country);
  const [stateSelected, setStateSelected] = useState(value.state);
  const [selectedCity, setSelectedCity] = useState(value.city);
  const [zipCode, setZipCode] = useState(value.zipCode);
  const [address, setAddress] = useState(value.address);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    setCountrySelected(value?.country);
    setStateSelected(value?.state);
    setSelectedCity(value?.city);
    setZipCode(value?.zipCode);
    setAddress(value?.address);
  }, [value]);

  useEffect(() => {
    setValue({ country: countrySelected, state: stateSelected });
  }, [countrySelected, stateSelected]);

  const getStatesOptions = () => {
    if (countrySelected !== undefined) {
      let country = allCountriesRef?.current?.find(
        (country) => country.name === countrySelected
      );
      let array = getStatesOfCountry(country?.isoCode || country?.name);
      setStateOptions(array);
    } else return [];
  };

  const getCityOptions = () => {
    if (countrySelected !== undefined) {
      let country = allCountriesRef?.current?.find((country) =>
        countrySelected.includes(country?.name)
      );
      let state = allStateRef?.current?.find((s) =>
        stateSelected?.includes(s?.name)
      );

      if (!stateSelected) {
        let array = City.getCitiesOfCountry(country?.isoCode || country?.name);
        setCityOptions(array);
      } else {
        let array = City.getCitiesOfState(
          country?.isoCode || country?.name,
          state?.isoCode
        );
        setCityOptions(array);
      }
    } else return [];
  };

  useEffect(() => {
    getStatesOptions();
    getCityOptions();
  }, [countrySelected, stateSelected]);

  const handleSave = () => {
    // Pass the updated address object to the parent
    setValue({
      country: countrySelected,
      state: stateSelected,
      city: selectedCity, // Include other fields like city and postal code if needed
      zipCode: zipCode,
      address: address,
    });
    setModalOpen(false); // Close modal
  };

  return (
    <>
      <Button
        onClick={() => handleToggleModal()}
        className="normal-input f-4 full-width br-0 px-0 py-2 align-items-center border-none bg-transparent d-flex justify-content-between"
      >
        <div className="mx-3"> {label}</div>{" "}
        <div className="mx-1">
          <FaCaretRight size={20} />
        </div>
      </Button>
      <Modal centered toggle={handleToggleModal} isOpen={modalOpen}>
        <ModalBody>
          <div className="d-flex align-items-center full-width mb-3  justify-content-between">
            <h5 className="f-5 color-half-white my-0 mx-3">{label}</h5>
            <Button
              onClick={() => handleToggleModal()}
              className="p-0  border-none"
              style={{
                height: "30px",
                width: "30px",
                background: "#333333",
                borderRadius: "50%",
              }}
            >
              <RxCross2 size={20} color="black" />
            </Button>
          </div>
          <div className="rounded-div mb-3">
            <CountrySelectInput
              placeholder={"Country / Territory"}
              value={countrySelected}
              setValue={setCountrySelected}
            />

            <DropdownInput
              menuDirection={"down"}
              menuStyle={{
                height: "300px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
              value={stateSelected}
              disabled={!["Canada", "United States"]?.includes(countrySelected)}
              setValue={(v) => setStateSelected(v)}
              placeholder={"State / Province / Region"}
              options={stateOptions?.map((state) => state?.name)}
            />
          </div>
          <div className="rounded-div mb-3">
            <NormalInput
              value={address}
              setValue={setAddress}
              placeholder={"Address"}
              label={"Address"}
              style={{ borderRadius: 0 }}
            />
            <CitySelectInput
              placeholder={"City"}
              menuDirection={"down"}
              value={selectedCity}
              options={cityOptions?.map((city) => city?.name)}
              menuStyle={{
                height: "300px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
              setValue={setSelectedCity}
            />
          </div>
          <NormalInput
            value={zipCode}
            setValue={setZipCode}
            className={"mb-3"}
            placeholder={"Postal / ZIP Code"}
          />
          <div className="d-flex align-items-center justify-content-between">
            <Button
              onClick={handleSave}
              className="bg-transparent f-4"
              style={{
                width: "80px",
                height: "40px",
                borderRadius: "20px",
                color: "cyan",
                borderColor: "cyan",
              }}
            >
              OK
            </Button>
            <Button
              onClick={() => setModalOpen((prev) => !prev)}
              className="bg-transparent f-4"
              style={{ width: "80px", height: "40px", borderRadius: "20px" }}
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddressModalInput;
