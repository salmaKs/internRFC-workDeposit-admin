"use client"
import React, { useState, useRef } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Input, InputGroup, InputRightElement, IconButton, Flex, Stack, Button,} from '@chakra-ui/react';
import { ViewIcon, Search2Icon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import './globals.css';
import AlertDialogComponent from '@/component/AlertDialog/page';
import DateDialogComponent from '@/component/DateDialog/page'

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const cancelRef = useRef();

  const values = {
    Thème: 'Example Theme',
    Date: '2024-07-12',
    Avancement: 50,
    Tâche: 'Example Task',
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setStartIndex(0);
  };

  const data = [
    { name: 'Salma ksantini', encadrant: 'Mohamed Achref Chourabi' },
    { name: 'Tamim Hmizi', encadrant: 'Mohamed Achref Chourabi' },
    { name: 'Farah', encadrant: 'Anis' },
    { name: 'Nour', encadrant: 'Ali' },
    { name: 'Ahmed', encadrant: 'Youssef' },
    { name: 'Mohamed', encadrant: 'Olfa' },
    { name: 'Amine', encadrant: 'Eya' },
    { name: 'Salah', encadrant: 'Eya' },
    { name: 'Yassine', encadrant: 'Ali' },
    { name: 'Sami', encadrant: 'Mohamed Achref Chourabi' },
    { name: 'Yassine', encadrant: 'Ali' },
    { name: 'Sami', encadrant: 'Mohamed Achref Chourabi' },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.encadrant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageSize = 5;
  const endIndex = startIndex + pageSize;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const canGoPrevious = startIndex > 0;
  const canGoNext = endIndex < filteredData.length;

  const goToPrevious = () => {
    setStartIndex(Math.max(0, startIndex - pageSize));
  };

  const goToNext = () => {
    setStartIndex(startIndex + pageSize);
  };

  const openDateDialog = () => {
    setIsDateDialogOpen(true);
  };

  const closeDateDialog = () => {
    setIsDateDialogOpen(false);
  };

  const openTodayDialog = (date) => {
    console.log('Opening dialog for:', date);
    setIsDialogOpen(true); 
    setIsDateDialogOpen(false); 
  };

  return (
    <Flex>
      {/* Main content */}
      <Box flex="1" p={4}>
        <Flex justify="flex-end" mb={4}>
          <Box width="300px">
            <InputGroup>
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search"
                  icon={<Search2Icon />}
                  onClick={() => { }}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>

        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Nom Prénom</Th>
                <Th>Encadrant</Th>
                <Th>Rapport de travail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayedData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.encadrant}</Td>
                  <Td>
                    <Stack direction="row" spacing={4}>
                      <Button
                        leftIcon={<ViewIcon />}
                        colorScheme="blue"
                        variant="solid"
                        size="sm"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        Voir aujourd'hui
                      </Button>
                      <Button
                        leftIcon={<ViewIcon />}
                        colorScheme="yellow"
                        variant="solid"
                        size="sm"
                        onClick={openDateDialog}
                      >
                        Voir tout
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Navigation buttons */}
        <Flex mt={4} justify="space-between">
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon />}
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            display={startIndex === 0 ? 'none' : 'block'}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon />}
            onClick={goToNext}
            disabled={!canGoNext}
            display={endIndex >= filteredData.length ? 'none' : 'block'}
          />
        </Flex>

        <DateDialogComponent
          isOpen={isDateDialogOpen}
          onClose={closeDateDialog}
          onOpenToday={openTodayDialog}
        />

        <AlertDialogComponent
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          cancelRef={cancelRef}
          values={values}
        />
      </Box>
    </Flex>
  );
}
