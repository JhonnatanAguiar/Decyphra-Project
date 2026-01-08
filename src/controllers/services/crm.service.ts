import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import type {
  LeadInput,
  UpdateLeadInput,
  ClientInput,
  UpdateClientInput,
  InteractionInput,
  LeadListQuery,
  ClientListQuery,
  InteractionListQuery,
} from '@/models/schemas'
import type {
  LeadDTO,
  LeadListDTO,
  ClientDTO,
  ClientListDTO,
  InteractionDTO,
  InteractionListDTO,
} from '@/models/types'

/**
 * CRM Service
 * 
 * Service responsável pela lógica de negócio do Mini-CRM
 * - Gerenciamento de Leads (potenciais clientes)
 * - Gerenciamento de Clients (clientes convertidos)
 * - Gerenciamento de Interactions (interações com leads/clientes)
 */

// ============================================
// LEADS
// ============================================

/**
 * Lista leads com filtros e paginação
 */
export async function listLeads(query: LeadListQuery): Promise<LeadListDTO> {
  const { status, source, limit, offset } = query

  const where: Prisma.LeadWhereInput = {}
  if (status) where.status = status
  if (source) where.source = source

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        convertedToClient: true,
        _count: {
          select: { interactions: true },
        },
      },
    }),
    prisma.lead.count({ where }),
  ])

  return {
    leads: leads.map((lead) => ({
      ...lead,
      convertedToClient: lead.convertedToClient || null,
      interactions: [],
    })) as LeadDTO[],
    total,
    limit,
    offset,
  }
}

/**
 * Busca um lead por ID
 */
export async function getLeadById(id: string): Promise<LeadDTO | null> {
  const lead = await prisma.lead.findUnique({
    where: { id },
      include: {
        convertedToClient: true,
        interactions: {
          orderBy: { createdAt: 'desc' },
          take: 10, // Últimas 10 interações
        },
        contactSubmission: true,
      },
  })

  return lead as LeadDTO | null
}

/**
 * Cria um novo lead
 */
export async function createLead(data: LeadInput): Promise<LeadDTO> {
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      service: data.service ?? null,
      source: data.source ?? null,
      status: data.status ?? 'new',
      score: data.score ?? 0,
      notes: data.notes ?? null,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
      contactSubmissionId: data.contactSubmissionId ?? null,
    },
  })

  return lead as LeadDTO
}

/**
 * Atualiza um lead existente
 */
export async function updateLead(data: UpdateLeadInput): Promise<LeadDTO> {
  const { id, ...updateData } = data

  const updatePayload: Prisma.LeadUpdateInput = {}
  
  if (updateData.name !== undefined) updatePayload.name = updateData.name
  if (updateData.email !== undefined) updatePayload.email = updateData.email
  if (updateData.phone !== undefined) updatePayload.phone = updateData.phone ?? null
  if (updateData.company !== undefined) updatePayload.company = updateData.company ?? null
  if (updateData.service !== undefined) updatePayload.service = updateData.service ?? null
  if (updateData.source !== undefined) updatePayload.source = updateData.source ?? null
  if (updateData.status !== undefined) updatePayload.status = updateData.status
  if (updateData.score !== undefined) updatePayload.score = updateData.score
  if (updateData.notes !== undefined) updatePayload.notes = updateData.notes ?? null
  if (updateData.metadata !== undefined) {
    updatePayload.metadata = updateData.metadata ? (updateData.metadata as Prisma.InputJsonValue) : Prisma.JsonNull
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: updatePayload,
  })

  return lead as LeadDTO
}

/**
 * Deleta um lead
 */
export async function deleteLead(id: string): Promise<void> {
  await prisma.lead.delete({
    where: { id },
  })
}

/**
 * Converte um lead em cliente
 */
export async function convertLeadToClient(leadId: string, clientData?: Partial<ClientInput>): Promise<ClientDTO> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      convertedToClient: true,
    },
  })

  if (!lead) {
    throw new Error('Lead não encontrado')
  }

  if (lead.convertedToClient) {
    throw new Error('Lead já foi convertido em cliente')
  }

  // Criar cliente a partir do lead
  const client = await prisma.client.create({
    data: {
      name: clientData?.name ?? lead.name,
      email: clientData?.email ?? lead.email,
      phone: clientData?.phone ?? lead.phone ?? null,
      company: clientData?.company ?? lead.company ?? null,
      status: 'active',
      segment: clientData?.segment ?? null,
      notes: clientData?.notes ?? lead.notes ?? null,
      metadata: clientData?.metadata
        ? (clientData.metadata as Prisma.InputJsonValue)
        : lead.metadata
          ? (lead.metadata as Prisma.InputJsonValue)
          : undefined,
      convertedFromLeadId: leadId,
    },
  })

  // Atualizar lead para marcar como convertido
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      status: 'won',
    },
  })

  return client as ClientDTO
}

// ============================================
// CLIENTS
// ============================================

/**
 * Lista clients com filtros e paginação
 */
export async function listClients(query: ClientListQuery): Promise<ClientListDTO> {
  const { status, segment, limit, offset } = query

  const where: Prisma.ClientWhereInput = {}
  if (status) where.status = status
  if (segment) where.segment = segment

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        convertedFromLead: true,
        _count: {
          select: { interactions: true },
        },
      },
    }),
    prisma.client.count({ where }),
  ])

  return {
    clients: clients.map((client) => ({
      ...client,
      convertedFromLead: client.convertedFromLead || null,
      interactions: [],
    })) as ClientDTO[],
    total,
    limit,
    offset,
  }
}

/**
 * Busca um client por ID
 */
export async function getClientById(id: string): Promise<ClientDTO | null> {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      convertedFromLead: true,
      interactions: {
        orderBy: { createdAt: 'desc' },
        take: 10, // Últimas 10 interações
      },
    },
  })

  return client as ClientDTO | null
}

/**
 * Cria um novo client
 */
export async function createClient(data: ClientInput): Promise<ClientDTO> {
  const client = await prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      cnpj: data.cnpj ?? null,
      address: data.address ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      zipCode: data.zipCode ?? null,
      status: data.status ?? 'active',
      segment: data.segment ?? null,
      notes: data.notes ?? null,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
      convertedFromLeadId: data.convertedFromLeadId ?? null,
    },
  })

  return client as ClientDTO
}

/**
 * Atualiza um client existente
 */
export async function updateClient(data: UpdateClientInput): Promise<ClientDTO> {
  const { id, ...updateData } = data

  const updatePayload: Prisma.ClientUpdateInput = {}
  
  if (updateData.name !== undefined) updatePayload.name = updateData.name
  if (updateData.email !== undefined) updatePayload.email = updateData.email
  if (updateData.phone !== undefined) updatePayload.phone = updateData.phone ?? null
  if (updateData.company !== undefined) updatePayload.company = updateData.company ?? null
  if (updateData.cnpj !== undefined) updatePayload.cnpj = updateData.cnpj ?? null
  if (updateData.address !== undefined) updatePayload.address = updateData.address ?? null
  if (updateData.city !== undefined) updatePayload.city = updateData.city ?? null
  if (updateData.state !== undefined) updatePayload.state = updateData.state ?? null
  if (updateData.zipCode !== undefined) updatePayload.zipCode = updateData.zipCode ?? null
  if (updateData.status !== undefined) updatePayload.status = updateData.status
  if (updateData.segment !== undefined) updatePayload.segment = updateData.segment ?? null
  if (updateData.notes !== undefined) updatePayload.notes = updateData.notes ?? null
  if (updateData.metadata !== undefined) {
    updatePayload.metadata = updateData.metadata ? (updateData.metadata as Prisma.InputJsonValue) : Prisma.JsonNull
  }

  const client = await prisma.client.update({
    where: { id },
    data: updatePayload,
  })

  return client as ClientDTO
}

/**
 * Deleta um client
 */
export async function deleteClient(id: string): Promise<void> {
  await prisma.client.delete({
    where: { id },
  })
}

// ============================================
// INTERACTIONS
// ============================================

/**
 * Lista interactions com filtros e paginação
 */
export async function listInteractions(query: InteractionListQuery): Promise<InteractionListDTO> {
  const { leadId, clientId, type, channel, limit, offset } = query

  const where: Prisma.InteractionWhereInput = {}
  if (leadId) where.leadId = leadId
  if (clientId) where.clientId = clientId
  if (type) where.type = type
  if (channel) where.channel = channel

  const [interactions, total] = await Promise.all([
    prisma.interaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        lead: true,
        client: true,
      },
    }),
    prisma.interaction.count({ where }),
  ])

  return {
    interactions: interactions as InteractionDTO[],
    total,
    limit,
    offset,
  }
}

/**
 * Busca uma interaction por ID
 */
export async function getInteractionById(id: string): Promise<InteractionDTO | null> {
  const interaction = await prisma.interaction.findUnique({
    where: { id },
    include: {
      lead: true,
      client: true,
    },
  })

  return interaction as InteractionDTO | null
}

/**
 * Cria uma nova interaction
 */
export async function createInteraction(data: InteractionInput): Promise<InteractionDTO> {
  // Validar que leadId ou clientId seja fornecido (mas não ambos)
  if (!data.leadId && !data.clientId) {
    throw new Error('leadId ou clientId deve ser fornecido')
  }
  if (data.leadId && data.clientId) {
    throw new Error('Apenas leadId ou clientId deve ser fornecido, não ambos')
  }

  const interaction = await prisma.interaction.create({
    data: {
      type: data.type,
      subject: data.subject ?? null,
      description: data.description,
      channel: data.channel,
      leadId: data.leadId ?? null,
      clientId: data.clientId ?? null,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
      createdBy: data.createdBy ?? null,
    },
    include: {
      lead: true,
      client: true,
    },
  })

  return interaction as InteractionDTO
}
