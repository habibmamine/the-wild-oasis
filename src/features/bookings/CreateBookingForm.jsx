/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import { countries, formatCurrency } from "../../utils/helpers";
import Heading from "../../ui/Heading";
import { useEffect, useState } from "react";
import useCreateGuest from "./useCreateGuest";
import useCreateBooking from "./useCreateBooking";
import useCabins from "../cabins/useCabins";
import DatesPicker from "../../ui/DatesPicker";
import useBookingByCabinId from "./useBookingByCabinId";
import useSettings from "../settings/useSettings";
import Checkbox from "../../ui/Checkbox";
import { differenceInDays, eachDayOfInterval, subDays } from "date-fns";
import toast from "react-hot-toast";

function CreateBookingForm({ onCloseModal }) {
  const [currentFeature, setCurrentFeature] = useState("guest");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [currentCabinId, setCurrentCabinId] = useState(null);
  const [currentCabinBookings, setCurrentCabinBookings] = useState(null);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [numGuests, setNumGuests] = useState(1);
  const [extrasPrice, setExtrasPrice] = useState(0);

  const { isCreatingGuest, mutateCreateGuest } = useCreateGuest();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoadingCabinBookings, mutateCabinBookings } = useBookingByCabinId(currentCabinId);
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isCreatingBooking, mutateCreateBooking } = useCreateBooking();

  const currentCabin = cabins?.find((cabin) => {
    return cabin.id === Number(currentCabinId);
  });

  const disabledDates = currentCabinBookings
    ?.map((booking) =>
      eachDayOfInterval({ start: booking.startDate, end: subDays(booking.endDate, 1) })
    )
    .flat();

  const numNights = differenceInDays(range.at(0).endDate, range.at(0).startDate);

  useEffect(
    function () {
      setExtrasPrice(hasBreakfast ? numGuests * settings?.breakfastPrice * numNights : 0);
    },
    [extrasPrice, hasBreakfast, numGuests, numNights, settings?.breakfastPrice]
  );

  useEffect(
    function () {
      if (!isLoadingCabins) setCurrentCabinId(cabins.at(0).id);
    },
    [cabins, isLoadingCabins]
  );

  useEffect(
    function () {
      if (currentCabinId)
        mutateCabinBookings(currentCabinId, { onSuccess: (data) => setCurrentCabinBookings(data) });
    },
    [currentCabinId, mutateCabinBookings]
  );

  const { register, handleSubmit, formState, getValues, setValue, reset } = useForm();
  const errors = formState.errors;

  let guestId;
  function onSubmit(data) {
    if (currentFeature === "guest") {
      setCurrentFeature("booking");
    }

    if (currentFeature === "booking") {
      // 1. create guest to get a guest ID
      const { fullName, email, nationality, countryFlag, nationalID } = data;
      mutateCreateGuest(
        { fullName, email, nationality, countryFlag, nationalID },
        {
          onSuccess: (newGuest) => {
            guestId = newGuest.id;

            const {
              startDate,
              endDate,
              numNights,
              numGuests,
              cabinPrice,
              extrasPrice,
              totalPrice,
              status,
              hasBreakfast,
              isPaid,
              observations,
              cabinId,
            } = data;
            mutateCreateBooking(
              {
                startDate,
                endDate,
                numNights,
                numGuests,
                cabinPrice,
                extrasPrice,
                totalPrice,
                status,
                hasBreakfast,
                isPaid,
                observations,
                cabinId,
                guestId,
              },
              {
                onSuccess: () => {
                  onCloseModal();
                  toast.success("Booking successfully created");
                },
                onError: reset,
              }
            );
          },
          onError: reset,
        }
      );

      // 2. create guest
    }
  }

  return (
    <>
      {currentFeature === "guest" && (
        <Form onSubmit={handleSubmit(onSubmit)} type="modal">
          <Heading as="h5">Guest</Heading>
          <FormRow label="fullName" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="nationality" error={errors?.nationality?.message}>
            <Select
              id="nationality"
              options={countries.map((country) => {
                return { label: country.name, value: country.name };
              })}
              useFormProps={{
                ...register("nationality", {
                  required: "This field is required",
                }),
              }}
            />
          </FormRow>

          <FormRow label="nationalID" error={errors?.nationalID?.message}>
            <Input
              type="text"
              id="nationalID"
              {...register("nationalID", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow>
            <Button variation="secondary" type="reset" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={setValue(
                "countryFlag",
                countries.find((c) => c.name === getValues().nationality)?.image
              )}
            >
              Next
            </Button>
          </FormRow>
        </Form>
      )}

      {currentFeature === "booking" && (
        <Form onSubmit={handleSubmit(onSubmit)} type="modal">
          <Heading as="h5">Cabin</Heading>

          <FormRow label="name" error={errors?.nationalID?.message}>
            <Select
              id="name"
              options={cabins.map((cabin) => {
                return { label: cabin.name, value: cabin.id };
              })}
              useFormProps={{
                ...register("cabinId", {
                  required: "This field is required",
                  onChange: (e) => setCurrentCabinId(e.target.value),
                }),
              }}
              disabled={
                isLoadingCabins ||
                isLoadingCabinBookings ||
                isLoadingSettings ||
                isCreatingGuest ||
                isCreatingBooking
              }
            />
          </FormRow>

          <Heading as="h5">Booking</Heading>

          <DatesPicker
            range={range}
            onChange={(item) => setRange([item.selection])}
            disabledDates={disabledDates}
          />

          <FormRow label="numGuests" error={errors?.numGuests?.message}>
            <Input
              type="number"
              id="numGuests"
              {...register("numGuests", {
                required: "This field is required",
                min: { value: 1, message: "Number of guests must more than one" },
                max: {
                  value: currentCabin?.maxCapacity,
                  message: `Max cabin capacity is ${currentCabin?.maxCapacity}`,
                },
                onChange: (e) => {
                  setNumGuests(e.target.value);
                  setExtrasPrice(
                    hasBreakfast ? Number(e.target.value) * settings.breakfastPrice * numNights : 0
                  );
                },
                value: numGuests,
              })}
              disabled={
                isLoadingCabins ||
                isLoadingCabinBookings ||
                isLoadingSettings ||
                isCreatingGuest ||
                isCreatingBooking
              }
            />
          </FormRow>

          <FormRow label="observations" error={errors?.observations?.message}>
            <Input
              type="text"
              id="observations"
              {...register("observations")}
              disabled={
                isLoadingCabins ||
                isLoadingCabinBookings ||
                isLoadingSettings ||
                isCreatingGuest ||
                isCreatingBooking
              }
            />
          </FormRow>

          <br />
          <Checkbox
            id="hasBreakfast"
            checked={hasBreakfast}
            onChange={() => {
              setHasBreakfast((val) => !val);
            }}
            disabled={
              isLoadingCabins ||
              isLoadingCabinBookings ||
              isLoadingSettings ||
              isCreatingGuest ||
              isCreatingBooking
            }
          >
            Want to add breakfast for {formatCurrency(settings?.breakfastPrice)} for each guest per
            night?
          </Checkbox>
          <br />

          <br />
          <Checkbox
            id="isPaid"
            checked={isPaid}
            onChange={() => {
              setIsPaid((val) => !val);
            }}
            disabled={
              isLoadingCabins ||
              isLoadingCabinBookings ||
              isLoadingSettings ||
              isCreatingGuest ||
              isCreatingBooking
            }
          >
            I confirm that the guest has paid the total amount of{" "}
            {formatCurrency(
              extrasPrice + (currentCabin?.regularPrice - currentCabin?.discount) * numNights
            )}
            {hasBreakfast
              ? ` (${formatCurrency(
                  (currentCabin?.regularPrice - currentCabin?.discount) * numNights
                )} + ${formatCurrency(extrasPrice)})`
              : ""}
          </Checkbox>
          <br />

          <FormRow>
            <Button
              variation="secondary"
              onClick={() => {
                setCurrentFeature("guest");
              }}
              disabled={
                isLoadingCabins ||
                isLoadingCabinBookings ||
                isLoadingSettings ||
                isCreatingGuest ||
                isCreatingBooking
              }
            >
              Back
            </Button>
            <Button
              disabled={
                isLoadingCabins ||
                isLoadingCabinBookings ||
                isLoadingSettings ||
                isCreatingGuest ||
                isCreatingBooking
              }
              onClick={() => {
                setValue("numNights", numNights);
                setValue(
                  "cabinPrice",
                  (currentCabin?.regularPrice - currentCabin?.discount) * numNights
                );
                setValue("extrasPrice", extrasPrice);
                setValue(
                  "totalPrice",
                  extrasPrice + (currentCabin?.regularPrice - currentCabin?.discount) * numNights
                );
                setValue("hasBreakfast", hasBreakfast);
                setValue("isPaid", isPaid);
                setValue("status", "unconfirmed");
                setValue("startDate", range.at(0).startDate.toISOString());
                setValue("endDate", range.at(0).endDate.toISOString());
              }}
            >
              Create booking
            </Button>
          </FormRow>
        </Form>
      )}
    </>
  );
}

export default CreateBookingForm;
